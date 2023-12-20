import React, { useRef, useMemo, useCallback, memo } from 'react'
import './QuillEditor.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // react-quill과 css파일 import 하기
import axios from 'axios';

const QuillEditor = memo(({ value, onChange }) => {
    const quillRef = useRef(null);


    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                // 이미지 파일이 선택되었다면, 서버에 업로드
                const formData = new FormData();
                formData.append("image", file);

                try {
                    // 서버에 이미지 업로드 요청
                    const response = await axios.post('/api/post/imageUpload', formData);
                    const url = response.data; // 서버로부터 받은 이미지 URL

                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection()?.index;

                    if (typeof range === 'number') {
                        // 서버에서 받은 URL을 에디터에 삽입
                        quill.insertEmbed(range, 'image', url);
                        quill.setSelection(range + 1);
                    }
                } catch (error) {
                    console.error('Image upload failed', error);
                    alert('이미지 업로드에 실패했습니다.');
                }
            }
        };
    }, []);


    const modules = useMemo(
        () => ({
            toolbar: { // 툴바에 넣을 기능들을 순서대로 나열하면 된다.
                container: [
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                        { align: [] },
                    ],
                    ["image", "video"],
                ],
                handlers: { // 위에서 만든 이미지 핸들러 사용하도록 설정
                    image: imageHandler,
                },
            },
        }), [imageHandler]);
    return (
        <>
            <ReactQuill
                ref={quillRef}
                value={value}
                onChange={onChange}
                modules={modules}
                theme="snow"

            />
        </>
    )
})

export default QuillEditor