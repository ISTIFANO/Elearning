import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Middleware = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Function to get cookie value
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        const userId = getCookie('userId');

        const checkAuth = async () => {
            try {
                const response = await fetch(`http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Middleware2.php?token=${userId}`);
                const data = await response.json();
                if (data.status === "not_valid") {
                    navigate("/Login");
                }
            } catch (error) {
                navigate("/Login");
            }
        };

        if (userId) {
            checkAuth();
        } else {
            navigate("/Login");
        }
    }, [navigate]);

    return (
        <div>
            {/* Your component content here */}
        </div>
    );
};

export default Middleware;
