// script.js - Logic chính của game học tập

// Biến global
let currentCategory = '';
let currentQuestionIndex = 0;
let answered = false;
let correctlyAnswered = false;
let shuffledQuestions = [];
let answeredNumbers = []; // Mảng lưu các số đã trả lời đúng

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Text-to-Speech function
function speak(text) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';
        utterance.rate = 1.0;
        utterance.pitch = 1.2;
        utterance.volume = 1;
        
        speechSynthesis.speak(utterance);
    }
}

// Audio functions
function playAudioFile(audioPath) {
    try {
        const audio = new Audio(audioPath);
        audio.volume = 0.7;
        audio.playbackRate = 1.2;
        audio.play().catch(error => {
            console.log('Không thể phát file audio:', error);
        });
    } catch (error) {
        console.log('Lỗi tạo audio:', error);
    }
}

function playCorrectSound() {
    if (typeof audioPaths !== 'undefined' && audioPaths.correct) {
        playAudioFile(audioPaths.correct);
    }
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
    } catch (error) {
        console.log('Không thể tạo âm thanh:', error);
    }
}

function playWrongSound() {
    if (typeof audioPaths !== 'undefined' && audioPaths.wrong) {
        playAudioFile(audioPaths.wrong);
    }
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.6);
    } catch (error) {
        console.log('Không thể tạo âm thanh:', error);
    }
}

function playClickSound() {
    if (typeof audioPaths !== 'undefined' && audioPaths.click) {
        playAudioFile(audioPaths.click);
    }
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        console.log('Không thể tạo âm thanh click:', error);
    }
}

// Game functions
function startGame(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    playClickSound();
    
    // Xử lý đặc biệt cho phần Đếm số
    if (category === 'numbers') {
        // Reset danh sách số đã trả lời đúng
        answeredNumbers = [];
        // Tạo bản sao của các câu hỏi và xáo trộn
        const originalQuestions = [...gameData[category].questions];
        shuffledQuestions = shuffleArray(originalQuestions);
    } else {
        // Xử lý bình thường cho các category khác
        shuffledQuestions = shuffleArray(gameData[category].questions);
    }
    
    document.getElementById('menuScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('categoryTitle').textContent = gameData[category].title;
    
    loadQuestion();
}

function loadQuestion() {
    if (currentCategory === 'numbers') {
        loadNumbersQuestion();
        return;
    }
    
    const question = shuffledQuestions[currentQuestionIndex];
    
    answered = false;
    correctlyAnswered = false;
    
    // Cập nhật progress bar
    const progress = ((currentQuestionIndex) / shuffledQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Hiển thị số câu hỏi hiện tại (nếu có element)
    const questionNumberElement = document.getElementById('questionNumber');
    if (questionNumberElement) {
        questionNumberElement.textContent = `Câu ${currentQuestionIndex + 1}/${shuffledQuestions.length}`;
    }
    
    // Hiển thị câu hỏi
    document.getElementById('questionText').textContent = question.question;
    
    // Cập nhật navigation buttons
    updateNavigationButtons();
    
    // Tạo các lựa chọn
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    container.className = 'options-container'; // Reset về class mặc định
    container.style.pointerEvents = 'none';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        
        // Xử lý different types of options
        if (typeof option === 'object' && option.image) {
            // Image option
            optionElement.innerHTML = `
                <img src="${option.image}" 
                     alt="${option.text || 'Option ' + (index + 1)}" 
                     style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit; display: block; margin: 0; padding: 0;"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size: 48px; display: flex; align-items: center; justify-content: center; height: 100%; color: #999; margin: 0; padding: 0;\\'>❓</span>';">
            `;
        } else if (typeof option === 'object' && option.text) {
            // Text option with styling (colors, numbers, flags)
            const style = option.style || "font-size: 18px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 10px;";
            optionElement.innerHTML = `<div style="${style}">${option.text}</div>`;
        } else if (typeof option === 'string' && option.length <= 2) {
            // Emoji option
            optionElement.innerHTML = `<span style="font-size: 60px; display: flex; align-items: center; justify-content: center; height: 100%;">${option}</span>`;
        } else {
            // Regular text option
            optionElement.innerHTML = `<span style="font-size: 18px; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 10px;">${option}</span>`;
        }
        
        optionElement.onclick = () => selectOption(index);
        container.appendChild(optionElement);
    });

    // Đọc câu hỏi bằng TTS
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(question.question);
        utterance.lang = 'vi-VN';
        utterance.rate = 1.0;
        utterance.pitch = 1.2;
        utterance.volume = 1;
        utterance.onend = () => {
            container.style.pointerEvents = 'auto';
        };
        speechSynthesis.speak(utterance);
    } else {
        container.style.pointerEvents = 'auto';
    }

    // Thử phát file audio câu hỏi nếu có
    if (question.audio) {
        setTimeout(() => {
            playAudioFile(question.audio);
        }, 1000);
    }
}

function loadNumbersQuestion() {
    // Lọc ra các số chưa được trả lời đúng
    const unansweredQuestions = shuffledQuestions.filter(q => 
        !answeredNumbers.includes(q.value)
    );
    
    // Nếu đã trả lời hết
    if (unansweredQuestions.length === 0) {
        endGame();
        return;
    }
    
    // Lấy câu hỏi ngẫu nhiên từ các số chưa trả lời
    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    const currentQuestion = unansweredQuestions[randomIndex];
    
    answered = false;
    correctlyAnswered = false;
    
    // Cập nhật progress (tính theo số câu đã trả lời đúng)
    const progress = (answeredNumbers.length / shuffledQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Hiển thị số câu hỏi còn lại
    const questionNumberElement = document.getElementById('questionNumber');
    if (questionNumberElement) {
        questionNumberElement.textContent = `Còn lại: ${shuffledQuestions.length - answeredNumbers.length} số`;
    }
    
    // Hiển thị câu hỏi với số được hỏi
    document.getElementById('questionText').innerHTML = 
        `${currentQuestion.question}<br><span style="font-size: 4em; color: #00b894; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">${currentQuestion.number}</span>`;
    
    // Ẩn navigation buttons trong chế độ đếm số
    document.getElementById('prevButton').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
    
    // Tạo grid các số từ 0-10
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    container.className = 'options-container numbers-grid';
    
    // Tạo mảng các số từ 0-10 và xáo trộn vị trí
    const numbers = Array.from({length: 11}, (_, i) => i);
    const shuffledNumbers = shuffleArray(numbers);
    
    // Tạo các option theo thứ tự đã xáo trộn
    shuffledNumbers.forEach(num => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        
        // Nếu số này đã được trả lời đúng thì disable
        if (answeredNumbers.includes(num)) {
            optionElement.classList.add('disabled');
            optionElement.innerHTML = `✓`;
            optionElement.style.pointerEvents = 'none';
        } else {
            optionElement.innerHTML = num.toString();
            optionElement.onclick = () => selectNumberOption(num, currentQuestion);
        }
        
        container.appendChild(optionElement);
    });

    // Đọc câu hỏi bằng TTS
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`Đâu là số ${currentQuestion.number}`);
        utterance.lang = 'vi-VN';
        utterance.rate = 1.0;
        utterance.pitch = 1.2;
        utterance.volume = 1;
        speechSynthesis.speak(utterance);
    }
}

function selectNumberOption(selectedNumber, currentQuestion) {
    playClickSound();
    
    const options = document.querySelectorAll('.option');
    
    if (selectedNumber === currentQuestion.correct) {
        // Đáp án đúng
        options.forEach(opt => {
            if (opt.textContent.trim() === selectedNumber.toString()) {
                opt.classList.add('correct');
            }
        });
        
        correctlyAnswered = true;
        answered = true;
        
        // Thêm số này vào danh sách đã trả lời đúng
        answeredNumbers.push(selectedNumber);
        
        playCorrectSound();
        showFeedback(true, "🎉 Chính xác!");
        
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance("Chính xác!");
            utterance.lang = 'vi-VN';
            utterance.rate = 1.0;
            utterance.pitch = 1.2;
            utterance.volume = 1;
            utterance.onend = () => {
                loadNumbersQuestion();
            };
            speechSynthesis.speak(utterance);
        }, 300);
        
    } else {
        // Đáp án sai
        options.forEach(opt => {
            if (opt.textContent.trim() === selectedNumber.toString()) {
                opt.classList.add('wrong');
            }
        });
        
        playWrongSound();
        showFeedback(false, "😅 Sai rồi!", `Bé thử lại nhé!`);
        
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance("Sai rồi! Bé thử lại nhé!");
            utterance.lang = 'vi-VN';
            utterance.rate = 1.0;
            utterance.pitch = 1.2;
            utterance.volume = 1;
            speechSynthesis.speak(utterance);
        }, 300);
    }
}

function updateNavigationButtons() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    // Nút "Câu trước" - chỉ cập nhật nếu element tồn tại
    if (prevButton) {
        if (currentQuestionIndex > 0) {
            prevButton.style.display = 'inline-block';
            prevButton.textContent = '⬅ Câu trước';
        } else {
            prevButton.style.display = 'none';
        }
    }
    
    // Nút "Câu tiếp theo" - chỉ cập nhật nếu element tồn tại
    if (nextButton) {
        nextButton.style.display = 'inline-block';
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            nextButton.textContent = 'Câu tiếp theo ➡';
        } else {
            nextButton.textContent = 'Kết thúc 🏁';
        }
    }
}

function selectOption(selectedIndex) {
    if (currentCategory === 'numbers') return; // Không sử dụng cho numbers
    
    if (correctlyAnswered) return;
    playClickSound();
    
    const question = shuffledQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    if (selectedIndex === question.correct) {
        // Đáp án đúng
        options[selectedIndex].classList.add('correct');
        correctlyAnswered = true;
        answered = true;
        
        playCorrectSound();
        showFeedback(true, "🎉 Chính xác!", "Hoan hô bé!");
        
        setTimeout(() => {
        // Đọc khen ngợi, và khi đọc xong thì chuyển câu
        const utterance = new SpeechSynthesisUtterance("Chính xác! Hoan hô bé!");
        utterance.lang = 'vi-VN';
        utterance.rate = 1.0;
        utterance.pitch = 1.2;
        utterance.volume = 1;
        utterance.onend = () => {
            autoNextQuestion();
        };
        speechSynthesis.speak(utterance);
    }, 300);
        
        
    } else {
        // Đáp án sai
        options[selectedIndex].classList.add('wrong');
        playWrongSound();
        showFeedback(false, "😅 Chưa đúng rồi!", "Bé thử lại nhé!");
        
        setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance("Chưa đúng rồi! Bé thử lại nhé!");
        utterance.lang = 'vi-VN';
        utterance.rate = 1.0;
        utterance.pitch = 1.2;
        utterance.volume = 1;
        speechSynthesis.speak(utterance);
    }, 300);
        
        // Sau 2 giây, xóa class wrong để có thể thử lại
        setTimeout(() => {
            options[selectedIndex].classList.remove('wrong');
        }, 2000);
        
        answered = false;
    }
}

function autoNextQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        
        // Xóa style cũ
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('correct', 'wrong');
        });
        
        loadQuestion();
    } else {
        endGame();
    }
}

function showFeedback(isCorrect, title, text) {
    const feedback = document.getElementById('feedback');
    const overlay = document.getElementById('overlay');
    
    feedback.className = `feedback ${isCorrect ? 'correct' : 'wrong'} show`;
    overlay.className = 'overlay show';
    
    document.getElementById('feedbackTitle').textContent = title;
    document.getElementById('feedbackText').textContent = text;
    
    setTimeout(() => {
        feedback.classList.remove('show');
        overlay.classList.remove('show');
    }, 2000);
}

// Navigation functions
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        playClickSound();
        currentQuestionIndex--;
        
        // Xóa style cũ
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('correct', 'wrong');
        });
        
        loadQuestion();
    }
}

function nextQuestion() {
    playClickSound();
    
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        
        // Xóa style cũ
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('correct', 'wrong');
        });
        
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    let message, emoji;
    
    if (currentCategory === 'numbers') {
        message = "Hoàn thành! Bé đã học xong tất cả các số từ 0 đến 10!";
        emoji = "🎉";
    } else {
        message = "Hoàn thành! Bé đã làm xong tất cả câu hỏi!";
        emoji = "🎉";
    }
        
    setTimeout(() => {
        speak(message);
    }, 500);
    
    // Cập nhật progress bar cuối
    document.getElementById('progressBar').style.width = '100%';
    
    // Hiển thị thông báo kết thúc
    showFeedback(true, emoji + " Hoàn thành!", message);
    
    // Tự động quay về menu sau 4 giây
    setTimeout(() => {
        backToMenu();
    }, 4000);
}

function backToMenu() {
    playClickSound();
    
    // Reset tất cả
    speechSynthesis.cancel();
    
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('menuScreen').style.display = 'block';
    
    // Xóa style các option
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('correct', 'wrong', 'disabled');
    });
    
    // Reset progress bar
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('questionNumber').textContent = '';
    
    // Reset variables
    shuffledQuestions = [];
    answeredNumbers = [];
    currentQuestionIndex = 0;
    
    // Hiện lại navigation buttons
    document.getElementById('prevButton').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
}

// Initialize game khi trang load
document.addEventListener('DOMContentLoaded', function() {
    // Hiển thị menu chính
    document.getElementById('menuScreen').style.display = 'block';
    document.getElementById('gameScreen').style.display = 'none';
    
    // Thêm sound effect cho tất cả buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', playClickSound);
    });
    
    // Preload audio files nếu có
    if (typeof audioPaths !== 'undefined') {
        Object.values(audioPaths).forEach(path => {
            const audio = new Audio(path);
            audio.preload = 'auto';
        });
    }
    
    // Kiểm tra gameData
    if (typeof gameData !== 'undefined') {
        console.log('Game đã sẵn sàng với ' + Object.keys(gameData).length + ' chủ đề!');
    } else {
        console.log('Game đã sẵn sàng! Đang chờ dữ liệu...');
    }
});