var images = document.getElementsByTagName('img');
for (var i = 0, l = images.length; i < l; i++) {
  images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height;
}


updateChildren(document)

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {


        for(let addedNode of mutation.addedNodes) {
            updateChildren(addedNode)
        }
    })
});
observer.observe(document, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
});

function updateChildren(node) {
    var paragraphs = node.getElementsByTagName('p')
            for(let p of paragraphs) {
                let capture = /\[\[(?<name>.*?)\]\]/g

                let matches = p.innerHTML.matchAll(capture)

                for(let m of matches) {
                    let cardName = m.groups.name
                    if(cardName.includes("cardname")){
                        break
                    }
                    let encodedCardName = encodeURIComponent(cardName)
                    let url = `https://api.scryfall.com/cards/named?fuzzy=${encodedCardName}`
                    fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        let toReplace = `[[${cardName}]]`
                        console.log(data)
                        let imageUrl = data.image_uris.normal
                        p.innerHTML = p.innerHTML.replaceAll(toReplace, `
                        <h3>${cardName}</h3>
                        <img class="cardimage" src=${imageUrl}></img>
                        <br/>
                        `)
                    });
                }

                // p.innerHTML = p.innerHTML.replaceAll(capture, function(match, cardName, offset) {
                //     console.log(match)
                //     console.log(cardName)

                //     let img = 'https://c1.scryfall.com/file/scryfall-cards/normal/front/f/1/f1933d08-07fe-45ea-9b60-d9afb98d5753.jpg?1562855620'
                //     return `<h4>${cardName}</h4><img src=${img}></img><br/>`
                // })
            }
}