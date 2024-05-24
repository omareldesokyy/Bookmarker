
// #region Colors And Search Section

var searchInput = document.getElementById('searchText');
var startSearch = document.getElementById('startSearch');

var body = document.getElementById('body');

var color1 = document.getElementById('exampleColorInput1');
var color2 = document.getElementById('exampleColorInput2');
var google = 'https://www.google.com/search?q='

function searchInGoogle() {
    if (searchInput.value != "") {
        startSearch.setAttribute("href", google + searchInput.value);
        startSearch.setAttribute("target", "_blank");
    }
    else {
        startSearch.removeAttribute("href");
        startSearch.removeAttribute("target");
    }
}

body.style.background =
    `linear-gradient(${color1.value}
, ${color2.value})`;

if (localStorage.getItem('color1') != null) {
    color1.value = localStorage.getItem('color1');
    color2.value = localStorage.getItem('color2');
}

body.style.background =
    `linear-gradient(${localStorage.getItem('color1')}
, ${localStorage.getItem('color2')})`;

color1.addEventListener('input', function () {
    localStorage.setItem('color1', `${color1.value}`); localStorage.setItem('color2', `${color2.value}`);
    body.style.background = `linear-gradient(${localStorage.getItem('color1')}, ${localStorage.getItem('color2')})`;
})

color2.addEventListener('input', function () {
    localStorage.setItem('color1', `${color1.value}`); localStorage.setItem('color2', `${color2.value}`);
    body.style.background = `linear-gradient(${localStorage.getItem('color1')}, ${localStorage.getItem('color2')})`;
})

// #endregion Colors And Search Section


// #region Selectors

var urlText = document.getElementById('floatingInput1');
var urlName = document.getElementById('floatingInput2');
var alert1 = document.getElementById('alert1')
var alert2 = document.getElementById('alert2')
var bookmarksArea = document.querySelector('.row.bookmarksArea');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var accordionBtn = document.querySelector('.accordion-button');
var accordionBody = document.getElementById('collapseOne');
// #endregion Selectors


// #region Get Data from local storage

var bookmarks = [];

if (localStorage.getItem('bookmarks') != null) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmarks();
}
else {
    bookmarks = [];
}


// #endregion Get Data from local storage


// #region Validation section

var urlValidation = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&\/=]*)$/;
var nameValidation = /^.{3,}$/;

var validate1;

urlText.addEventListener('input', function () {
    validate1 = urlValidation.test(this.value);
    if (validate1) {
        alert1.classList.add('d-none');
        urlText.classList.remove('is-invalid');
        urlText.classList.add('is-valid')
    }
    else {
        if (this.value == '') {
            alert1.classList.add('d-none');
            urlText.classList.remove('is-invalid');
            urlText.classList.remove('is-valid');
        }
        else {
            alert1.classList.remove('d-none');
            urlText.classList.add('is-invalid');
            urlText.classList.remove('is-valid')
        }
    }
})

var validate2;

urlName.addEventListener('input', function () {
    validate2 = nameValidation.test(this.value);
    if (validate2) {
        alert2.classList.add('d-none');
        urlName.classList.remove('is-invalid');
        urlName.classList.add('is-valid')
    }
    else {
        if (this.value == '') {
            alert2.classList.add('d-none');
            urlName.classList.remove('is-invalid');
            urlName.classList.remove('is-valid');
        }
        else {
            alert2.classList.remove('d-none');
            urlName.classList.add('is-invalid');
            urlName.classList.remove('is-valid')
        }
    }
})

function addBtnActivation() {
    if (validate1 && validate2 && urlName.value != '' && urlText.value != '') {
        addBtn.removeAttribute('data-bs-target')
        addBtn.removeAttribute('data-bs-toggle')
        addBtn.setAttribute('onclick', 'addBookmark()')
    }
    else {
        addBtn.setAttribute('data-bs-target', '#staticBackdrop')
        addBtn.setAttribute('data-bs-toggle', 'modal')
        addBtn.removeAttribute('onclick')
    }
}

function updateBtnActivation() {

    if(urlValidation.test(urlText.value) &&  nameValidation.test(urlName.value) && urlName.value != '' && urlText.value != '' ){
        updateBtn.removeAttribute('data-bs-target')
        updateBtn.removeAttribute('data-bs-toggle')
        updateBtn.setAttribute('onclick', 'confirmUpdates()')
    }
    else {
        updateBtn.setAttribute('data-bs-target', '#staticBackdrop')
        updateBtn.setAttribute('data-bs-toggle', 'modal')
        updateBtn.removeAttribute('onclick')
    }
}

urlName.addEventListener('input', addBtnActivation);
urlText.addEventListener('input', addBtnActivation);
urlText.addEventListener('input', updateBtnActivation);
urlName.addEventListener('input', updateBtnActivation);
// #endregion Validation section


// #region Functions

var updatedItem;

function addBookmark() {

    var bookmark = {
        urlText: urlText.value,
        urlName: urlName.value,
        imgPath: ''
    }

    bookmarks.push(bookmark);

    bookmark.imgPath = ` https://www.google.com/s2/favicons?domain=${urlText.value}`;
    onDataChanged();
    clearForm();

    // addBtn.classList.add('disabled')
    urlName.classList.remove('is-invalid');
    urlText.classList.remove('is-invalid');
    urlText.classList.remove('is-valid');
    urlName.classList.remove('is-valid');

}

function clearForm() {
    urlText.value = '';
    urlName.value = '';
    addBtn.setAttribute('data-bs-target', '#staticBackdrop');
    addBtn.setAttribute('data-bs-toggle', 'modal');
    addBtn.removeAttribute('onclick');
}

function displayBookmarks() {
    var bookmarksContainer = "";
    for (var i = 0; i < bookmarks.length; i++) {
        bookmarksContainer += `
        <div class="col-lg-2 col-md-4 text-center">
            <div class="btn-group shadow">
                <button type="button" class="btn btn-light">
                    <a class="w-100 h-100 d-flex align-items-center justify-content-center" target="_blank" href=${bookmarks[i].urlText}>
                        <img class="w-50 h-50 object-fit-contain" src=${bookmarks[i].imgPath} alt="favicon.ico">
                    </a>
                </button>
                <button type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-caret-down"></i>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item edit" onclick="updateBookmark(${i})">Edit</a></li>
                    <li><a class="dropdown-item remove" onclick="deleteBookmark(${i})">Remove</a></li>
                </ul>
            </div>
            <h6 class="text-light">${bookmarks[i].urlName}</h6>
        </div>`
    }
    bookmarksArea.innerHTML = bookmarksContainer;
}

function onDataChanged() {

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();

}

function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    if (JSON.parse(localStorage.getItem('bookmarks')).length <= 1) {

        localStorage.removeItem('bookmarks')
        displayBookmarks();

    }
    else {
        onDataChanged();
    }

}

function disableDroppedWhileUpdating() {
    var menus = document.querySelectorAll('.dropdown-item');

    menus.forEach(function (btnGroup) {
            btnGroup.classList.add('disabled');
    });
}

function enableDroppedWhileUpdating() {
    var menus = document.querySelectorAll('.dropdown-item');

    menus.forEach(function (btnGroup) {
            btnGroup.classList.remove('disabled');
    });
}

function updateBookmark(index) {
    accordionBtn.classList.remove('collapsed');
    accordionBody.classList.add('show');

    urlText.value = bookmarks[index].urlText;
    urlName.value = bookmarks[index].urlName;


    updatedItem = index;

    disableDroppedWhileUpdating();

    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');

}

function confirmUpdates() {
    bookmarks[updatedItem].urlText = urlText.value;
    bookmarks[updatedItem].urlName = urlName.value;
    bookmarks[updatedItem].imgPath = `https://www.google.com/s2/favicons?domain=${urlText.value}`;
    onDataChanged();
    clearForm();

    updateBtn.classList.add('d-none');
    addBtn.classList.remove('d-none');


    urlName.classList.remove('is-invalid');
    urlText.classList.remove('is-invalid');
    urlText.classList.remove('is-valid');
    urlName.classList.remove('is-valid');

    enableDroppedWhileUpdating();



}



// #endregion Functions
