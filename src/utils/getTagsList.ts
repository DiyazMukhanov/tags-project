export const getTagsList = (tags, ids) => {
    let tagsList = []

    for (let i = 0; i < ids.length; i++) {
        let tag = tags.filter(tag => tag.id === ids[i])
        tagsList.push(tag[0])
    }

    return tagsList
}