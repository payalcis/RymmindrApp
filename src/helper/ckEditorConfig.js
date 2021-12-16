
const ckEditorConfig = {
    toolbar: {
      items: [
          'heading', '|', 'fontSize', '|',
          'fontfamily', '|', 'fontColor',
          'alignment', '|',
          'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
          'link', '|',
          'outdent', 'indent', '|',
          'bulletedList', 'numberedList', 'todoList', '|',
          'insertTable', '|',
          'blockQuote', '|',
          'undo', 'redo'
      ],
      shouldNotGroupWhenFull: true
    },
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
        ]
    },
    ckfinder: {
        // Upload the images to the server using the CKFinder QuickUpload command.
        //uploadUrl: '/var/www/html/RymindrApi/groupicon',
        uploadUrl: 'https://rymindr.com/RymindrApi/api/user/uploadEditorFile',
        //uploadUrl: 'http://localhost:5551/candidates/test_upload',
        // options: {
        //     resourceType: 'Images'
        // }
    },
    fontSize: {
      options: [
        9,
        11,
        13,
        'default',
        17,
        19,
        21
      ],
      supportAllValues: true
  },
  fontColor: {
    colors: [
        {
            color: '#000',
            label: 'Black'
        },
        {
            color: '#909',
            label: 'Dim grey'
        },
        {
            color: 'hsl(0, 0%, 60%)',
            label: 'Grey'
        },
        {
            color: 'hsl(0, 0%, 90%)',
            label: 'Light grey'
        },
        {
            color: 'hsl(0, 0%, 100%)',
            label: 'White',
            hasBorder: true
        },
        {
          color: '#FFFF00',
          label: 'Yellow'
        },
        {
            color: '#006400',
            label: 'Dark Green'
        },
        {
            color: '#0000FF',
            label: 'Blue'
        },
        {
            color: '#4B0082',
            label: 'Indigo'
        },
        {
            color: '#FF0000',
            label: 'Red',
        },
        {
          color: '#FFA500	',
          label: 'Orange'
        },
        {
            color: '#A52A2A',
            label: 'Brown',
        },
        {
          color: '#9774d9',
          label: 'Light Purple',
        },
        {
          color: '#227986',
          label: 'Bottle Green'
        },
        {
            color: '#52e79d',
            label: 'Light Green',
        }        
    ]
},
}
export default ckEditorConfig;
