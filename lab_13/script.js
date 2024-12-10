document.addEventListener("DOMContentLoaded", function() {
  // Отримуємо елемент аудіо (фонову музику)
  const music = document.getElementById("background-music");
  
  // Встановлюємо гучність музики (10%)
  music.volume = 0.1;

  // Тестовий акаунт
  const testAccount = {
    email: "Test@gmail.com",
    password: "123456789"
  };

  // Перевірка авторизації
  let loggedIn = JSON.parse(localStorage.getItem("loggedIn")) || false;

  // Вставка карток
  const userCards = document.getElementById("user-cards");

  // Інформація про користувачів
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com", phone: "+123456789", address: "123 Ocean Street" },
    { id: 2, name: "Bob", email: "bob@example.com", phone: "+987654321", address: "456 Sea Road" },
    { id: 3, name: "Charlie", email: "charlie@example.com", phone: "+192837465", address: "789 Beach Avenue" }
  ];

  // Функція для відображення карток
  function displayUserCards() {
    userCards.innerHTML = "";
    users.forEach(user => {
      const card = document.createElement("div");
      card.classList.add("card");

      // Відображаємо різну інформацію в залежності від авторизації
      if (loggedIn) {
        card.innerHTML = `
          <img src="image/Bomba.png" alt="${user.name}" class="avatar">
          <h3>${user.name}</h3>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
          <p>Address: ${user.address}</p>
        `;
      } else {
        card.innerHTML = `
          <img src="images/bomba.png" alt="${user.name}" class="avatar">
          <h3>${user.name}</h3>
        `;
      }

      card.addEventListener("click", () => openUserDetails(user));
      userCards.appendChild(card);
    });
  }

  // Функція для відкриття модального вікна з інформацією
  function openUserDetails(user) {
    const modal = document.getElementById("user-modal");
    const userDetails = document.getElementById("user-details");
    userDetails.innerHTML = `
      <h2>${user.name}</h2>
      <p>Email: ${user.email}</p>
      <p>Phone: ${user.phone}</p>
      <p>Address: ${user.address}</p>
    `;
    modal.style.display = "flex";
  }

  // Закриття модального вікна
  document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("user-modal").style.display = "none";
  });

  // Функція логіну
  document.getElementById("login-btn").addEventListener("click", function() {
    // Запит логін даних
    const email = prompt("Enter your email:(Test@gmail.com)");
    const password = prompt("Enter your password:(123456789)");

    // Перевірка даних
    if (email === testAccount.email && password === testAccount.password) {
      loggedIn = true;
      localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
      alert("Login successful!");
      document.getElementById("login-section").style.display = "none";
      document.getElementById("logout-section").style.display = "block";
      displayUserCards();
    } else {
      alert("Invalid email or password. Try again.");
    }
  });

  // Функція лог-ауту
  document.getElementById("logout-btn").addEventListener("click", function() {
    loggedIn = false;
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    alert("You have logged out.");
    document.getElementById("login-section").style.display = "block";
    document.getElementById("logout-section").style.display = "none";
    displayUserCards();
  });

  // Автоматична перевірка авторизації при завантаженні
  if (loggedIn) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("logout-section").style.display = "block";
    displayUserCards();
  } else {
    displayUserCards();
  }
});
