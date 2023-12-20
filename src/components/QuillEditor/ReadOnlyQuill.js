import React from 'react';
import ReactQuill from 'react-quill'; // 에디터 core
import 'react-quill/dist/quill.bubble.css'; // bubble 테마 css

const ReadOnlyQuill = ({ content }) => {
    return (
        <ReactQuill 
            value={content}
            readOnly={true}
            theme="bubble" // 읽기 전용이며 툴바 없는 bubble 테마 사용
        />
    );
};

export default ReadOnlyQuill;
