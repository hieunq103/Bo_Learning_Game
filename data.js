// data.js - Dữ liệu câu hỏi cho game học tập

const gameData = {
    animals: {
        title: "🐶 ĐỘNG VẬT",
        questions: [
            {
                question: "Con nào là con chó?",
                options: [
                    { image: "assets/images/animal/dog.png" },
                    { image: "assets/images/animal/cat.png" }
                ],
                correct: 0
            },
            {
                question: "Con nào là con mèo?",
                options: [
                    { image: "assets/images/animal/mouse.jpg" },
                    { image: "assets/images/animal/cat.png" }
                ],
                correct: 1
            },
            {
                question: "Con nào là con voi?",
                options: [
                    { image: "assets/images/animal/elephent.jpg" },
                    { image: "assets/images/animal/mouse.jpg" }
                ],
                correct: 0

            },
            {
                question: "Con chuột ở đâu?",
                options: [
                    { image: "assets/images/animal/tiger.jpg" },
                    { image: "assets/images/animal/mouse.jpg" }
                ],
                correct: 1
            },
            {
                question: "Con sư tử đâu?",
                options: [
                    { image: "assets/images/animal/lion.jpg" },
                    { image: "assets/images/animal/mouse.jpg" }
                ],
                correct: 0
            },
            {
                question: "Con chim đâu?",
                options: [
                    { image: "assets/images/animal/bird.jpeg" },
                    { image: "assets/images/animal/cat.png" }
                ],
                correct: 0
            },
            {
                question: "Đâu là con cá?",
                options: [
                    { image: "assets/images/animal/bird.jpeg" },
                    { image: "assets/images/animal/fish.jpg" }
                ],
                correct: 1
            },
            {
                question: "Con nào là con trâu?",
                 options: [
                    { image: "assets/images/animal/buffalo.jpg" },
                    { image: "assets/images/animal/cat.png" }
                ],
                correct: 0
            },
            {
                question: "Con nào là con ngựa?",
                options: [
                    { image: "assets/images/animal/horse.jpg" },
                    { image: "assets/images/animal/goat.png" }
                ],
                correct: 0
            },
            {
                question: "Con nào là hươu cao cổ?",
                options: [
                    { image: "assets/images/animal/deer.webp" },
                    { image: "assets/images/animal/cow.jpg" }
                ],
                correct: 0
            },
            {
                question: "Đâu là con gà?",
                options: [
                    { image: "assets/images/animal/chicken.jpeg" },
                    { image: "assets/images/animal/duck.jpg" }
                ],
                correct: 0
            },
            {
                question: "Đâu là con vịt?",
                options: [
                    { image: "assets/images/animal/duck.jpg" },
                    { image: "assets/images/animal/peacock.jpg" }
                ],
                correct: 0
            },
            {
                question: "Con nào là con ong?",
                options: [
                    { image: "assets/images/animal/bee.jpeg" },
                    { image: "assets/images/animal/butterfly.jpg" }
                ],
                correct: 0
            },
            {
                question: "Con nào là con hổ?",
                options: [
                    { image: "assets/images/animal/tiger.jpg" },
                    { image: "assets/images/animal/hippopotamus.jpg" }
                ],
                correct: 0
            },
            {
                question: "Con nào là con khỉ?",
                options: [
                    { image: "assets/images/animal/monkey.jpg" },
                    { image: "assets/images/animal/panda.jpg" }
                ],
                correct: 0
            },
            {
                question: "Con nào là con rùa?",
                options: [
                    { image: "assets/images/animal/turtle.jpg" },
                    { image: "assets/images/animal/frog.jpg" }
                ],
                correct: 0
            },
            {
                question: "Con nào là con ếch?",
                options: [
                    { image: "assets/images/animal/frog.jpg" },
                    { image: "assets/images/animal/snake.png" }
                ],
                correct: 0
            },
            {
                question: "Con nào là con gấu trúc?",
                options: [
                    { image: "assets/images/animal/panda.jpg" },
                    { image: "assets/images/animal/bear.jpg" }
                ],
                correct: 0
            }

            
        ]
    },
    
    numbers: {
        title: "🔢 ĐẾM SỐ",
        questions: (function() {
            // Tạo câu hỏi động từ 0 đến 10
            const questions = [];
            for (let i = 0; i <= 10; i++) {
                questions.push({
                    question: `Đâu là số`,
                    number: i,
                    correct: i,
                    value: i
                });
            }
            return questions;
        })()
    },
    
    colors: {
        title: "🎨 MÀU SẮC",
        questions: [
            {
                question: "Đâu là màu đỏ?",
                options: [
                    { text: "ĐỎ", style: "background: #e74c3c; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "VÀNG", style: "background: #f1c40f; color: black; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "XANH DƯƠNG", style: "background: #3498db; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" }
                ],
                correct: 0
            },
            {
                question: "Đâu là màu vàng?",
                options: [
                    { text: "CAM", style: "background: #e67e22; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "VÀNG", style: "background: #f1c40f; color: black; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "TÍM", style: "background: #9b59b6; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" }
                ],
                correct: 1
            },
            {
                question: "Đâu là màu xanh dương?",
                options: [
                    { text: "HỒNG", style: "background: #ff69b4; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "ĐEN", style: "background: #000000; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "XANH DƯƠNG", style: "background: #3498db; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" }
                ],
                correct: 2
            },
            {
                question: "Đâu là màu xanh lá?",
                options: [
                    { text: "TRẮNG", style: "background: #ffffff; color: black; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "XANH LÁ", style: "background: #2ecc71; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "NÂU", style: "background: #8b4513; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" }
                ],
                correct: 1
            },
            {
                question: "Đâu là màu cam?",
                options: [
                    { text: "XÁM NHẠT", style: "background: #bdc3c7; color: black; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "ĐEN", style: "background: #000000; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "CAM", style: "background: #e67e22; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" }
                ],
                correct: 2
            },
            {
                question: "Đâu là màu tím?",
                options: [
                    { text: "TRẮNG", style: "background: #ffffff; color: black; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "TÍM", style: "background: #9b59b6; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "ĐỎ", style: "background: #e74c3c; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" }
                ],
                correct: 1
            },
            {
                question: "Đâu là màu hồng?",
                options: [
                    { text: "NÂU", style: "background: #8b4513; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "VÀNG", style: "background: #f1c40f; color: black; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "HỒNG", style: "background: #ff69b4; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" }
                ],
                correct: 2
            },
            {
                question: "Đâu là màu trắng?",
                options: [
                    { text: "ĐEN", style: "background: #000000; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "TRẮNG", style: "background: #ffffff; color: black; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "CAM", style: "background: #e67e22; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" }
                ],
                correct: 1
            },
            {
                question: "Đâu là màu đen?",
                options: [
                    { text: "TÍM", style: "background: #9b59b6; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "HỒNG", style: "background: #ff69b4; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "ĐEN", style: "background: #000000; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" }
                ],
                correct: 2
            },
            {
                question: "Đâu là màu nâu?",
                options: [
                    { text: "ĐỎ", style: "background: #e74c3c; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "NÂU", style: "background: #8b4513; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "VÀNG", style: "background: #f1c40f; color: black; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" }
                ],
                correct: 1
            },
            {
                question: "Đâu là màu xám nhạt?",
                options: [
                    { text: "CAM", style: "background: #e67e22; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "XÁM NHẠT", style: "background: #bdc3c7; color: black; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" },
                    { text: "XANH LÁ", style: "background: #2ecc71; color: white; font-size: 24px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; border-radius: inherit;" }
                ],
                correct: 1
            }
        ]
    }
};