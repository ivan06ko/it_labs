document.addEventListener("DOMContentLoaded", () => {
    const userCardsContainer = document.getElementById("user-cards");
    const loginButton = document.getElementById("login-btn");
    const logoutButton = document.getElementById("logout-btn");
    const modal = document.getElementById("user-modal");
    const modalContent = document.getElementById("user-details");
    const closeModal = document.querySelector(".close");
    const loginSection = document.getElementById("login-section");
    const logoutSection = document.getElementById("logout-section");
    let isLoggedIn = false;
  
    // Завантаження користувачів
    const fetchUsers = async () => {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      return data.users;
    };
  
    // Рендер карток
    const renderCards = (users) => {
      userCardsContainer.innerHTML = '';
      users.forEach(user => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="image/Bomba.jpg" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 10px;">
          <h2>${user.firstName} ${user.lastName}</h2>
          <p>Email: ${isLoggedIn ? user.email : '******'}</p>
          <p>Phone: ${isLoggedIn ? user.phone : '******'}</p>
        `;
        card.addEventListener("click", () => {
          if (isLoggedIn) {
            showUserDetails(user);
          } else {
            alert("Please log in to see more details.");
          }
        });
        userCardsContainer.appendChild(card);
      });
    };
  
    // Показати деталі користувача
    const showUserDetails = (user) => {
      modalContent.innerHTML = `
        <img src="image/Bomba.jpg" alt="Avatar" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 10px;">
        <h2>${user.firstName} ${user.lastName}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Address:</strong> ${user.address.address}, ${user.address.city}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
      `;
      modal.style.display = "flex";
    };
  
    // Закрити модальне вікно
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    // Закриття модального вікна при натисканні за межами контенту
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  
    // Імітація логіну
    loginButton.addEventListener("click", async () => {
      isLoggedIn = true;
      const users = await fetchUsers();
      renderCards(users);
      loginSection.style.display = "none"; // Приховуємо кнопку "Login"
      logoutSection.style.display = "block"; // Показуємо кнопку "Log Out"
    });
  
    // Функція для лог-ауту
    logoutButton.addEventListener("click", () => {
      isLoggedIn = false;
      userCardsContainer.innerHTML = ''; // Очищаємо картки користувачів
      loginSection.style.display = "block"; // Показуємо кнопку "Login"
      logoutSection.style.display = "none"; // Приховуємо кнопку "Log Out"
    });
  
    // Початковий рендер
    (async () => {
      const users = await fetchUsers();
      renderCards(users);
    })();
  });
  