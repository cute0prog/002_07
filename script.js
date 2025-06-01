let usernames = ['admin', 'user1', 'user2'];
let passwords = ['qwer1234', 'abcd1234', '1234abcd'];

let subtitles = ['개요', '종류', '모양에 따른 분류','형태', '출처'];
let subtitlesId = ['outline', 'kind', 'class', 'shape', 'source'];
let subtitlesIndex = ['1. ', '2. ', '3. ', '4. ', '5. '];

let currentUser = null;
let loginStatus = false;
let darkMode = false;

function register() {
    if (!loginStatus) {
        let username = prompt('아이디를 입력해주세요');
        if (!username) {
            alert('아이디를 입력하지 않았습니다.');
            return;
        }
        else if (usernames.includes(username)) {
            alert('이미 존재하는 아이디입니다.');
            return;
        }

        let password = prompt('비밀번호를 입력해주세요');
        if (!password) {
            alert('비밀번호를 입력하지 않았습니다.');
            return;
        }
        else if (password.length < 4 || password.length > 20) {
            alert('비밀번호는 4자리 이상, 20자리 이하여야 합니다.');
            return;
        }

        usernames.push(username);
        passwords.push(password);
        alert('회원가입이 완료되었습니다.');
    }
}

function loginLogout() {
    if (loginStatus) {
        currentUser = null;
        loginStatus = false;
        alert('로그아웃되었습니다.');
        document.getElementById('loginLogoutButton').innerText = '로그인';
        document.getElementById('register').innerText = '회원가입';
    }
    else {
        let username = prompt('아이디를 입력해주세요');
        if (!username) {
            alert('아이디를 입력하지 않았습니다.');
            return;
        }
        let password = prompt('비밀번호를 입력해주세요');
        if (!password) {
            alert('비밀번호를 입력하지 않았습니다.');
            return;
        }
        const index = usernames.indexOf(username);
        if (index === -1 || passwords[index] !== password) {
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
            return;
        }

        currentUser = username;
        loginStatus = true;
        alert(`${username}님, 로그인되었습니다.`);
        document.getElementById('loginLogoutButton').innerText = '로그아웃';
        document.getElementById('register').innerText = currentUser;
    }
}

function search() {
    const input = document.getElementById('searchInput').value.trim();
    document.getElementById('searchInput').value = '';

    if (input === '') {
        alert('검색어를 입력해주세요.');
        return;
    }
    else if (input === '나무') {
        alert('"나무" 문서로 이동했습니다.');
        return;
    }
    else {
        window.open('noresult.html', '_self');
    }
}

function edit() {
    if (loginStatus) {
        let subtitle = prompt('수정할 문서의 소제목을 입력해주세요');
        if (!subtitle) {
            alert('소제목을 입력하지 않았습니다.');
            return;
        }
        else if (!subtitles.includes(subtitle)) {
            alert('존재하지 않는 소제목입니다.');
            return;
        }

        const index = subtitles.indexOf(subtitle);
        
        let subtitleId = subtitlesId[index];
        const toToc = document.createElement('a');
        toToc.href = '#toc';
        toToc.innerText = subtitlesIndex[index];

        alert('현재로선 문서의 소제목만 수정할 수 있습니다.');
        let content = prompt('수정할 내용을 입력해주세요');
        if (content) {
            document.getElementById(subtitleId).innerText = '';
            document.getElementById(subtitleId).appendChild(toToc);
            document.getElementById(subtitleId).appendChild(document.createTextNode(content));
            subtitles[index] = content;
            alert(`소제목을 ${content}(으)로 수정했습니다.`);
        }
        else {
            alert('수정할 내용을 입력하지 않았습니다.');
        }
    } else {
        alert('로그인 후에 수정할 수 있습니다.');
    }  
    
}