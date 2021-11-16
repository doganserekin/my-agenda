import axios from 'axios';

export const request = (request) => {

    return axios
      .get(`${request}`, {
        timeout: 10000
        }
      )
      .then(response => {
        console.log("REQUEST",response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
        return 'invalid'
      });

};
