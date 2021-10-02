let canvas = document.getElementById('myGame');
let ctx = canvas.getContext('2d');
let scoreShow = document.getElementById("score");
let audio=new Audio('cxloblap.mp3')

let birdImg = new Image(); //tạo biến để thêm ảnh ( chim )
let display = new Image();  // ảnh nền
let columnUp = new Image(); // ống trên
let columnDown = new Image();// ống dứoi
//thêm ảnh bằng cách biên.src ( thuộc tính)
birdImg.src = "bird.png";
display.src = "nenchinh.png";
columnDown.src = "ongduoi.png";
columnUp.src = "ongtren.png";
let score = 0;
let distanceColumn = 140;     // khoảng cách giữa 2 ống
let distance;                 // khoảng cách vị trí từ đầu ống trên đến đầu ống dưới
let bird = {
    x: display.width / 10, // tạo biến chim với tọa độ x,y so với hình nền
    y: display.height /1.5
}
let pillar = [];   // tạo biến ống rỗng
pillar[0] = {
    x: canvas.width,   // ống đầu tiên có tọa độ phía bền phải của canvas và y=0
    y: 0
}// x là chiều rộng
//y là chiều cao ,x và y tọa độ so với gốc là góc cao nhất đầu tiên bên trái .
// tạo hàm start để chạy chương trình
function start() {
    audio.play();
    ctx.drawImage(display, 0, 0);             // drawImage () vẽ một hình ảnh lên canvas có tạo độ x,y context.drawImage(img,x,y);
    ctx.drawImage(birdImg, bird.x, bird.y);
    for (let i = 0; i < pillar.length; i++) {
        distance = columnUp.height + distanceColumn;// vị trí ống trên so vs ống dưới sẽ bằng  chiều cao
                                                  // ống trên + với khoảng các 2 ống
        ctx.drawImage(columnUp, pillar[i].x, pillar[i].y);
        ctx.drawImage(columnDown, pillar[i].x, pillar[i].y + distance);
        // vẽ 2 ống, ống dưới có tọa độ phụ thuộc vào oog trên
        pillar[i].x -= 5; // để ống có thể di chuyển
        if (pillar[i].x === canvas.width / 2) {
            // nếu ống di chuyển đến giữa canvas thì sẽ cho thêm 1 ống nữa
            pillar.push({
                x: canvas.width,
                y: Math.floor(Math.random() * columnUp.height) - columnUp.height//floor là tròn thành số nguyên
            })
            // push 1 ống có tọa độ ra x= chiều dài canvas, y random ,y khoang vượt quá chiều cao của ống trên .
        }
        if (pillar[i].x === 0) { // khi ống chạm lề bên trái ta xóa ống đi
            pillar.splice(0, 1) // splice dùng để thêm hoặc xóa phần tử trong mảnh
                                             // ở đây ở vị trí 0 , xóa 1 phần tử
        }
        if (pillar[i].x === bird.x) // nếu tọa độ x của ống và chim bằng nhau thì điểm cộng 1
            score += 1;
        if (bird.y + birdImg.height === canvas.height ||
            bird.x + birdImg.width >= pillar[i].x && bird.x <= pillar[i].x + columnUp.width
            && (bird.y <= pillar[i].y + columnUp.height ||
                bird.y + birdImg.height >= pillar[i].y + distance)
            // nếu chiều cao của chim bằng với lề canvas
            // th2 so sánh vị trí của con chim với ống
            // so sánh vị trí y
        ) {
            return;
        }

    }
    scoreShow.innerHTML = "score: " + score;
    bird.y -= 3; // làm cho chim ơi bay lên :))
    requestAnimationFrame(start)
    //yêu cầu trình duyệt gọi hàm start để cập nhập lại toàn bộ ảnh trước lần start 2 ....
}

document.addEventListener("keydown", function () {
    // addEventListener () gắn một trình xử lý sự kiện vào phần tử được chỉ định ( khi bấm nhấn xuống
    //thì ở function sẽ thực hiện bird.y+=60
    bird.y += 60; // mỗi lần ấn xuống là chym sẽ giảm 60.
})

start();