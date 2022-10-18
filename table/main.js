function UserTable({ _content, _form, _addButton, _deleteButton, _userInfo, _localStorageKeyName }) {
    this.init = function () {
        this.onSubmit();
        this.onAddButton();
        this.loadUser();
    }
    this.onSubmit = function () {
        _form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addUser({
                name: _form.elements['name'].value,
                age: _form.elements['age'].value,
                phone: _form.elements['phone'].value,
                id: Math.floor(Math.random() * 100),
            });
            _form.reset();
            _form.classList.remove('open');
        });
    }
    this.addUser = function (user) {
        this.userTemplate(user);
        const users = JSON.parse(localStorage.getItem(_localStorageKeyName)) || [];
        users.push(user);
        localStorage.setItem(_localStorageKeyName, JSON.stringify(users));
    }
    this.userTemplate = function (user) {
        _content.insertAdjacentHTML('beforeend', (
            `<tr data-id="${user.id}">`+
                `<td>${user.id}</td>`+
                `<td>${user.name}</td>`+
                `<td>${user.phone}</td>`+
                `<td>${user.age}</td>`+
                `<td>`+
                    '<button type="button" class="btn btn-primary js--view">View</button>'+
                    ' <button type="button" class="btn btn-primary js--delete">Delete</button>'+
                `</td>`+
            `</tr>`
        ))
        const _currentTr = document.querySelector(`[data-id="${user.id}"]`);
        const viewButton = _currentTr.querySelector('.js--view');
        const deleteButton = _currentTr.querySelector('.js--delete');
        const handleView = () => {
            _userInfo.innerHTML = JSON.stringify(user, undefined, 2);
        }
        const handleDelete = ()=>{

           let deletedUser = _currentTr;
           deletedUser.remove();
            _userInfo.innerHTML='';
            localStorage.setItem(_localStorageKeyName,JSON.stringify(deletedUser));
            localStorage.removeItem(deletedUser);
        }
        viewButton.addEventListener('click', handleView);
        deleteButton.addEventListener('click',handleDelete);

    }
    this.onAddButton = function () {
        _addButton.addEventListener('click', function () {
            _form.classList.add('open');
        })
    }

    this.loadUser = function () {
        const users = JSON.parse(localStorage.getItem(_localStorageKeyName));
        if (users) {
            users.forEach(userItem => this.userTemplate(userItem));
        }
    }
}

const userDate = new UserTable({
    _localStorageKeyName: 'users',
    _content: document.querySelector('.js--content'),
    _form: document.querySelector('.js--form'),
    _addButton: document.querySelector('.js--add'),
    _deleteButton: document.querySelector('.js--delete'),
    _userInfo: document.querySelector('.js--user'),
});

document.addEventListener('DOMContentLoaded', function () {
    userDate.init();
});


