function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = ; expires=${date.toUTCString()};
    }
    document.cookie = ${name}=${value || ''}${expires}; path=/;
  } 










{userId ? (
    <Link to="Profile"><CgProfile size={20} className="text-black" /></Link>
) : (
    <Link to="Login"><CgProfile size={20} className="text-black" /></Link>
              )}

// protected route react

const userId = getCookie('userId');
    function getCookie(name) {
        const value = ; ${document.cookie};
        const parts = value.split(; ${name}=);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }







