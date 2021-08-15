let attemptEl = document.getElementById('attempts');
let imgContainer = document.getElementById('image-container');
let btnContainer = document.getElementById('btn-containder');
let leftImg = document.getElementById('leftImg');
let midImg = document.getElementById('midImg');
let rightImg = document.getElementById('rightImg');
let result = document.getElementById('results');
let roundP = document.getElementById('round');
let productsImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 
                    'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 
                    'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 
                    'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 
                    'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let maxAttempts = 25;
let attempt = 1;
let products = [];

let leftIndex;
let midIndex;
let rightIndex;
let vResult_Btn

function ProductImage(productName) 
{
    this.cProductName = productName.split('.')[0];
    this.productImg = `img/${productName}`;
    this.votes = 0;
    this.views = 0;
    products.push(this);
}

for (let i = 0; i < productsImages.length; i++) 
{
    new ProductImage(productsImages[i]);
}

function randomImage() 
{
    return Math.floor(Math.random() * products.length);
}

function renderImg() 
{
    leftIndex = randomImage();
    midIndex = randomImage();
    rightIndex = randomImage();
    while (leftIndex === rightIndex || leftIndex === midIndex) 
    {
        leftIndex = randomImage();
    }
    while(rightIndex === midIndex)
    {
        rightIndex = randomImage();
    }
    leftImg.setAttribute('src', products[leftIndex].productImg);
    midImg.setAttribute('src', products[midIndex].productImg);
    rightImg.setAttribute('src', products[rightIndex].productImg);
    products[leftIndex].views++;
    products[midIndex].views++;
    products[rightIndex].views++;
    console.log(products);
}
renderImg();

leftImg.addEventListener('click', clickHandler);
midImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);

function clickHandler(event) 
{
    if (attempt < maxAttempts) 
    {
        let clickedImage = event.target.id;
        if (clickedImage === 'leftImg') 
        {
            products[leftIndex].votes++;
        } 
        else if (clickedImage === 'midImg') 
        {
            products[midIndex].votes++
        }
        else if (clickedImage === 'rightImg') 
        {
            products[rightIndex].votes++
        }
        roundP.textContent = `Round ${attempt + 1}`
        renderImg();
        attempt++;
    } 
    else 
    {
        vResult_Btn = document.createElement('button');
        vResult_Btn.textContent = 'View Results';
        vResult_Btn.addEventListener('click', renderResult);
        btnContainer.appendChild(vResult_Btn);

        leftImg.removeEventListener('click', clickHandler);
        midImg.removeEventListener('click', clickHandler);
        rightImg.removeEventListener('click', clickHandler);
    }
}


function renderResult()
{
    for (let i = 0; i < products.length; i++) 
    {
        let liEl = document.createElement('li');
        result.appendChild(liEl);
        liEl.textContent = `${products[i].cProductName} had ${products[i].votes} votes, and was seen ${products[i].views} times.`;
        vResult_Btn.remove();
    }
}

