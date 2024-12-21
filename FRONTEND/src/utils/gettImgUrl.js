function getImgUrl(none){
    return new URL(`../assets/books/${none}`,import.meta.url)
}
export {getImgUrl};