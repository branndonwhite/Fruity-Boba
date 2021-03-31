window.onload = function(){
    const useNodeJS = false;

    const defaultLiffId = "DEFAULT_LIFF_ID";

    let myLiffId = "";

    if(useNodeJS){
        fetch('/send-id')
            .then(function(reqResponse){
                return reqResponse.json();
            })
            .then(function(jsonResponse){
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            }).catch(function(error){
                console.log(error);
            })
    }else{
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};

const initializeLiffOrDie = (myLiffId) => {
    if(myLiffId){
        initializeLiff(myLiffId);
    }
}

const initializeLiff = (myLiffId) => {
    liff.init({
        liffId: myLiffId
    })
    .then(() => {
        initializeApp();
    })
    .catch((err) => {
        console.log(err);
    })
}

const initializeApp = () => {
    isInClientInfo();

    if(liff.isLoggedIn()){
        liff.getProfile()
            .then(profile => {
                const name = profile.displayName;
                const picture = profile.pictureUrl;
                let greeting = 
                    '<h3 align="center">Welcome back,'+ name +'<img src="'+ picture +'" class="img-thumbnail" alt="profile pic"></h3>' +
                    '<p align="center">You can order any drink you love for yourself and friends!</p>';
                
                document.getElementById('greeting').appendChild(greeting);
            })
        

        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('logout-btn').classList.remove('hidden');
    }else{
        document.getElementById('login-page').classList.remove('hidden');
        document.getElementById('greeting').classList.add('hidden');
        document.getElementById('menu-list').classList.add('hidden');
        document.getElementById('greeting').classList.add('hidden');
        document.getElementById('open-browser').classList.add('hidden');
        document.getElementById('liff-info-btn').classList.add('hidden');
    }
}

const isInClientInfo = () => {
    if(liff.isInClient()){
        document.getElementById('open-browser').classList.remove('hidden');
    }else{
        document.getElementById('open-browser').classList.add('hidden');
    }
}

const buttonHandlers = () => {
    // login LIFF app on external browser
    document.getElementById('liff-login-btn').addEventListener('click', function(){
        if(!liff.isLoggedIn()){
            liff.login();
            
        }
    });

    // open LIFF app on external browser
    document.getElementById('open-browser').addEventListener('click', function(){
        liff.openWindow({
            url: 'WEBSITE_URL',
            external: true
        });
    });

    // logout LIFF app on external browser 
    document.getElementById('liff-logout-btn').addEventListener('click', function(){
        if(liff.isLoggedIn()){
            liff.logout();
            window.location.reload();
        }
    });

}