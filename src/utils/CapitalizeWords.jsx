function capitalizeWordsExceptOneLetter(str) {
    return str
        .split("_")
        .map((word) => {
            if (word.length > 1) {
                return (
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                );
            } else {
                return word.toLowerCase();
            }
        })
        .join(" ");
}

export default capitalizeWordsExceptOneLetter;
