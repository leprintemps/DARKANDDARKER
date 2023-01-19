import 'react-quill/dist/quill.snow.css'
import dynamic from "next/dynamic";
import Quill from "quill";

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}
/*
* Quill editor formats
* See https://quilljs.com/docs/formats/
*/
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

const quillConfig = {
    modules,
    formats,
};

export {quillConfig}
  
const makeQuill = () => {
    const ReactQuill = dynamic(() => import('react-quill'), {
        ssr: false,
        // loading: () => <p>Loading ...</p>,
    });
    return ReactQuill;
}

export default makeQuill;