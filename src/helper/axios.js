import axios from 'axios';

const Axios = () => {
        return (
            axios.create({
                // baseURL: 'http://3.22.170.46/RymindrApi/api/',
                // baseURL: 'http://3.250.21.0/RymindrServer/api/',
                // baseURL: 'http://3.250.21.0/RymindrApi/api/',
                baseURL: 'https://rymindr.com/RymindrApi/api/',
                //baseURL: 'https://79.125.3.9/RymindrApi/api/',
                headers: {
                    'Accept': 'application/vnd.app.v5+json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
                //baseURL: 'https://rymindrapi.com/RymindrApi/api/',
                // baseURL: 'http://localhost/rymindr/RymindrApi/api/',
            })
        )
    }
    //Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //Axios.defaults.headers.Accept = 'application/vnd.app.v5+json';
    //Axios.defaults.headers.Authorization = "Bearer "+ localStorage.getItem('token');
    //fetchAxios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
export default Axios;