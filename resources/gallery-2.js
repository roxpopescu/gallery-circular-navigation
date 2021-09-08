$(function() {
    const overlay = $('.overlay');
    const imgWrapper = $('.img-wrapper');
    const galleryContentWrapper = $('.gallery-content-wrapper');
    const arrows = overlay.find('i');
    const flagsIdArr = [];

    let getRandomInt = function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    };

    // adding dynamically the content to the HTML structure
    flagsArr.forEach(function(flagItem) {
        let flagGalleryItem = `<div data-id=${flagItem.id} data-img=${flagItem.imgUrl} class="gallery-item" style="background-image: url(assets/gallery-2-assets/${flagItem.imgUrl})"></div>`;
        galleryContentWrapper.append(flagGalleryItem);

        // temporary data structure: array of ids only
        flagsIdArr.push(flagItem.id);
    });

    console.log(flagsIdArr);

    // we need to use delegate here because this content is dynamically added and does not exist the the DOM is initially loaded
    galleryContentWrapper.delegate('.gallery-item', 'click', function() {
        imgWrapper.css({backgroundImage: `url(assets/gallery-2-assets/${$(this).data('img')})`});
        imgWrapper.data('id', $(this).data('id'));
        overlay.fadeIn();

        let galleryIte = flagsIdArr.indexOf($(this).data('id'));
        // I - programatically or randomnly change flag to display
        setInterval(function() {
            // moving circularly to the next; the getting to the right limit it starts from the beginning
            // we don't need a validation condition if we want to randomnly change flag, because the max limit is already passes as the last element of the array
            if(galleryIte >= flagsIdArr.length) {
                galleryIte = 0;
            } else {
                galleryIte++;
            }

            for(let i = 0; i < flagsArr.length; i++) {
                // get the relative flag object from flagsArr based on the id
                if(flagsIdArr[galleryIte] === flagsArr[i].id) {
                // if(flagsIdArr[getRandomInt(flagsArr.length - 1)] === flagsArr[i].id) {
                    imgWrapper.attr('style', `background-image: url(assets/gallery-2-assets/${flagsArr[i].imgUrl})`);
                    imgWrapper.attr('data-id', flagsArr[i].id);
                }
            }
        }, 2000);
    });

    // to avoid closing/hiding the overlay clicking the image ONLY
    imgWrapper.click(function(e) {
        // prevents propagation of the same event from being called
        e.stopPropagation();
    });

    overlay.click(function() {
        $(this).fadeOut();
    });

    // II - display next/previous flag
    arrows.click(function(e) {
        e.stopPropagation();
        let direction = $(this).data('direction');
        let currentFlagId = $(this).parents('.overlay-content-wrapper').find('.img-wrapper').data('id');

        let galleryIte = flagsIdArr.indexOf(currentFlagId);

        switch(direction) {
            case 'right':
                if(galleryIte >= flagsIdArr.length - 1) {
                    galleryIte = 0;
                } else {
                    galleryIte++;
                }
                break;
            case 'left':
                if(galleryIte <= 0) {
                    galleryIte = flagsIdArr.length - 1;
                } else {
                    galleryIte--;
                }
                break;
        }

        for(let i = 0; i < flagsArr.length; i++) {
            if(flagsIdArr[galleryIte] === flagsArr[i].id) {
                imgWrapper.attr('style', `background-image: url(assets/gallery-2-assets/${flagsArr[i].imgUrl})`);
                imgWrapper.data('id', flagsArr[i].id);
            }
        }
    });
});