export default {
    //Get
    get: (url) => {
        return fetch(url, {
            method: "get",
        })
        .then(res => res.json())
        .catch(err => console.log(err));
    },
}