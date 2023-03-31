document.addEventListener("DOMContentLoaded", () => {
    //сортировка изображений
    const sortLinks = document.querySelectorAll('.gallery__nav-link');
    const imagesSort = document.querySelectorAll('.gallery__item');
    sortLinks.forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault()
            let navId = this.getAttribute('data-id');
            sortLinks.forEach(element => {
                element.classList.remove('gallery__nav-link--active')
            })
            this.classList.add('gallery__nav-link--active');

            imagesSort.forEach(element => {
                element.classList.add('gallery__item--hidden')
                let imageId = element.getAttribute('data-id');

                if (imageId == navId) {
                    element.classList.remove('gallery__item--hidden')
                } else if (navId == 1) {
                    element.classList.remove('gallery__item--hidden')
                }
            })
        })
    });

    //отображение изображений
    const viewLinks = document.querySelectorAll('.gallery__view-nav-link');
    const viewContainer = document.querySelector('.gallery-view__items');
    viewLinks.forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            let navId = this.getAttribute('data-id');
            viewLinks.forEach(element => {
                element.classList.remove('gallery__view-nav-link--active')
            })
            this.classList.add('gallery__view-nav-link--active');
            if (navId == 1) {
                viewContainer.classList.remove('gallery-view__items--3')
            } else {
                viewContainer.classList.add('gallery-view__items--3')
            }
        })
    });

    //таблица с формой

    $('.custom-input__field').on('focus', function () {
        let container = $(this).closest('.custom-input');
        container.addClass('custom-input--focus');
    })

    $('.custom-input__field').on('focusout', function () {
        let container = $(this).closest('.custom-input');
        if ($(this).val() == '') {
            container.removeClass('custom-input--focus');
        }
    });

    let companyText = $('.custom-select__field--company option:selected').text();

    let jobText = $('.custom-select__field--job option:selected').text();



    $('.custom-select__field--company').select2({
        minimumResultsForSearch: -1
    });

    $('.custom-select__field--job').select2({
        minimumResultsForSearch: -1
    });


    $('.custom-select__field--company').on("change", function (e) {
        let optionId = $(this).val();
        let options = $($('.hiden-select__group[data-id=' + optionId + ']').html());
        $('.custom-select__field--job').html(options);
        companyText = $(this).find('option:selected').text()
        $('.custom-select__field--job').trigger('change')
    });

    $('.custom-select__field--job').on("change", function () {
        jobText = $(this).find('option:selected').text();
    })


    let count = 0;
    $('.data-form').on('submit', function (e) {
        e.preventDefault();
        let form = $(this);
        let data = form.serializeArray()
        count++;
        $.ajax({
            type: "POST",
            url: '#',
            data: data,
            success: function () {
                $('.table__row-template').find('.table__column--id').text(count)
                $('.table__row-template').find('.table__column--name').text(data[0].value)
                $('.table__row-template').find('.table__column--surname').text(data[1].value)
                $('.table__row-template').find('.table__column--email').text(data[2].value)
                $('.table__row-template').find('.table__column--company').text(companyText)
                $('.table__row-template').find('.table__column--job').text(jobText)

                let row = $($('.table__row-template').html())
                $('.table').append(row)
                $('.table').removeClass('table--hidden')
                form.trigger('reset');
                $(".custom-select__field--job").trigger('change')
                $(".custom-select__field--company").trigger('change');
                $('.custom-input').removeClass('custom-input--focus')
            }
        });

    })
});