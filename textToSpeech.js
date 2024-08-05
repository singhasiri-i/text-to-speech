// SpeechSynthesisUtterance เป็น object ของ JS ที่ใช้จัดการเรื่องเสียง
const speech = new SpeechSynthesisUtterance()
let voices = []
const textArea = document.getElementById("myTextArea")
const voiceOption = document.getElementById("voiceOption")
const speakBtn = document.getElementById("speakBtn")

window.speechSynthesis.onvoiceschanged = () => {
    // เอาเสียงที่มีอยู่แล้วออกมาโดยใช้ .getVoices()
    voices = window.speechSynthesis.getVoices()
        
    voices.forEach((voice, i) => {
        voiceOption.options[i] = new Option(voice.name, i)
        // ตัว object new Option มันจะวนของใน array "voices" ทีละตัว 
        // แล้วสร้าง <option> ใต้ <select> แบบนี้ไปเรื่อยๆ ทีละตำแหน่งจนครบ
        // <option value='0'>{voice.name}</option>
        // <option value='1'>{voice.name}</option>
        // <option value='2'>{voice.name}</option>
    })
}

speakBtn.onclick = () => {
    speech.text = textArea.value // อยากให้มันอ่าน text อะไร
    window.speechSynthesis.speak(speech)
}

voiceOption.onchange = () => {
    // อยากให้มันใช้เสียงไหน ตามค่าที่เลือกใน dropdown 
    // ซึ่ง voiceOption.value จะส่งมาเป็นตำแหน่งของ voices
    speech.voice = voices[voiceOption.value]
}

// ถ้า textArea.value มีค่าเป็น string ว่างๆ หมายถึง
// speakBtn.disabled = true ดังนั้นปุ่มก็จะมีสถานะเป็น disabled 
// ซึ่งจะทำงานแค่ครั้งแรกหลัง refresh
speakBtn.disabled = textArea.value == "";
// ด้านล่างจะทำงานเรื่อยๆ โดย event จะดักจับ ถ้า textarea มี input แล้ว
// มันจะทำให้ speakBtn.disabled = false ปุ่มก็จะไม่ disabled
textArea.addEventListener("input", () => {
    speakBtn.disabled = textArea.value == ""
})
