$(function() {

    let users = [{
            'name': 'Fabien',
            'lastname': 'Potencier',
            'language': 'PHP'
        },
        {
            'name': 'Taylor',
            'lastname': 'Otwell',
            'language': 'PHP'
        },
        {
            'name': 'Adam',
            'lastname': 'Wathan',
            'language': 'PHP'
        },
        {
            'name': 'James',
            'lastname': 'Gosling',
            'language': 'JAVA'
        },
        {
            'name': 'Bjarne',
            'lastname': 'Stroustrup',
            'language': 'C++'
        },
    ];

    $("#sign-up").submit(function(event) {

        event.preventDefault();

        let language = escapeOutput($('#programming_languages  option:selected').val())
        let name = escapeOutput($('#name').val());
        let lastName = escapeOutput($('#last_name').val());

        let newUser = {
            'name': name,
            'lastname': lastName,
            'language': language
        };

        if (addUser(newUser)) {
            clearForm();
            printGrid(language);
        }

    });

    $("#programming_languages").change(function() {

        let choosedLanguage = $(this).val();
        printGrid(choosedLanguage);

    });

    function printGrid(language) {

        let cTable = $('#container-table');

        cTable.html('');

        if (language.length < 1) {
            addCell(cTable, 'no-content', 'Select a course');
            return;
        }

        let usersLanguage = users.filter(user => user.language == language).sort(orderNamesFn);

        addCell(cTable, 'header', 'Name');
        addCell(cTable, 'header', 'Lastname');
        addCell(cTable, 'header', 'Course name');

        usersLanguage.forEach(function(user) {
            addCell(cTable, 'content', user.name);
            addCell(cTable, 'content', user.lastname);
            addCell(cTable, 'content', user.language);
        });

        if (usersLanguage.length < 1) {
            addCell(cTable, 'cell-1-2', 'There is not students in this course');
            addCell(cTable, 'cell-3', language);
        }
    }

    function orderNamesFn(u1, u2) {
        if (u1.name > u2.name) {
            return 1;
        }

        if (u1.name < u2.name) {
            return -1;
        }

        if (u1.lastname > u2.lastname) {
            return 1;
        }

        if (u1.lastname < u2.lastname) {
            return -1;
        }

        return 0;
    }

    function addCell(table, clas, content) {
        table.append('<div class="' + clas + '">' + content + '</div>');
    }

    function addUser(newUser) {

        if (newUser.language.length < 1) {
            alert('Choose a course');
            return false;
        }

        if (newUser.name.length < 1) {
            alert('Write the name of the user');
            return false;
        }

        if (newUser.lastname.length < 1) {
            alert('Write the lastname of the user');
            return false;
        }

        if (userExists(newUser)) {
            alert('This user already exists in the table');
            return false;
        }

        users.push(newUser);

        return true;
    }

    function userExists(newUser) {
        let userFinded = users.find(user =>
            user.name === newUser.name &&
            user.lastname === newUser.lastname &&
            user.language === newUser.language
        );

        return (typeof userFinded !== 'undefined');
    }

    function escapeOutput(text) {
        return text.trim().replace(/\&/g, '&amp;')
            .replace(/\</g, '&lt;')
            .replace(/\>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/\'/g, '&#x27')
            .replace(/\%/g, '(percent)')
            .replace(/\//g, '&#x2F');
    }

    function clearForm() {
        $('#name').val('');
        $('#last_name').val('');
    }
});