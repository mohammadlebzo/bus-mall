let attemptEl = document.getElementById('attempts');
let imgContainer = document.getElementById('image-container');
let btnContainer = document.getElementById('btn-containder');
let leftImg = document.getElementById('leftImg');
let midImg = document.getElementById('midImg');
let rightImg = document.getElementById('rightImg');
let result = document.getElementById('results');
let roundP = document.getElementById('round');
let ctx = document.getElementById('myChart').getContext('2d');
let productsImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 
                    'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 
                    'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 
                    'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 
                    'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let maxAttempts = 25;
let attempt = 1;
let products = [];
let productsNames = [];
let votesArr = [];
let viewsArr = [];

let votesArrTemp = [];
let viewsArrTemp = [];

let usedImg = [];

let leftIndex;
let midIndex;
let rightIndex;
let vResult_Btn;

// let test = false;

function saveToLocalStorage() {
    let votesData = JSON.stringify(votesArr);
    let viewsData = JSON.stringify(viewsArr);

    localStorage.setItem('views', viewsData);
    localStorage.setItem('votes', votesData);
}
function readFromLocalStorage() {
    let stringViews = localStorage.getItem('views');
    let stringVotes = localStorage.getItem('votes');

    let normalViews = JSON.parse(stringViews);
    let normalVotes = JSON.parse(stringVotes);

    if (normalViews) 
    {
        viewsArrTemp = normalViews;
    }
    if (normalVotes) 
    {
        votesArrTemp = normalVotes;
    }
    // localStorage.clear();
    console.log('votes', votesArrTemp);
    console.log('views', viewsArrTemp);
}
readFromLocalStorage();

function ProductImage(productName) 
{
    this.cProductName = productName.split('.')[0];
    this.productImg = `img/${productName}`;
    this.votes = 0;
    this.views = 0;
    products.push(this);
    productsNames.push(this.cProductName);
}

for (let i = 0; i < productsImages.length; i++) 
{
    new ProductImage(productsImages[i]);
}

function randomImage() 
{
    return Math.floor(Math.random() * products.length);
}

function randControl()
{
    while(leftIndex === usedImg[0] || leftIndex === usedImg[1] || leftIndex === usedImg[2])
    {
        leftIndex = randomImage();
    }
    while(midIndex === usedImg[0] || midIndex === usedImg[1] || midIndex === usedImg[2])
    {
        midIndex = randomImage();
    }
    while(rightIndex === usedImg[0] || rightIndex === usedImg[1] || rightIndex === usedImg[2])
    {
        rightIndex = randomImage();
    }
}

function renderImg() 
{
    leftIndex = randomImage();
    midIndex = randomImage();
    rightIndex = randomImage();

    randControl();
    while (leftIndex === rightIndex || leftIndex === midIndex) 
    {
        leftIndex = randomImage();
    }
    while(rightIndex === midIndex)
    {
        rightIndex = randomImage();
    }
    randControl();
    usedImg.splice(0, usedImg.length);

    leftImg.setAttribute('src', products[leftIndex].productImg);
    midImg.setAttribute('src', products[midIndex].productImg);
    rightImg.setAttribute('src', products[rightIndex].productImg);
    products[leftIndex].views++;
    products[midIndex].views++;
    products[rightIndex].views++;

    usedImg.push(leftIndex);
    usedImg.push(midIndex);
    usedImg.push(rightIndex);

    // test = true;
    // console.log(usedImg);
    
    // console.log(products);
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
        // saveToLocalStorage()
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
    let res1 = [];
    let res2 = [];
    // result.textContent = '';
    for(let i = 0; i < products.length; i++)
    {
        if(typeof votesArrTemp[i] === 'undefined')
        {
            votesArrTemp[i] = 0;
        }
        if(typeof viewsArrTemp[i] === 'undefined')
        {
            viewsArrTemp[i] = 0;
        }
    }
    for (let i = 0; i < products.length; i++) 
    {
        
        votesArr.push(products[i].votes);
        viewsArr.push(products[i].views);

        console.log('vo', votesArr[i]);
        console.log('vi', viewsArr[i]);


        votesArr[i] += votesArrTemp[i];
        viewsArr[i] += viewsArrTemp[i];

        console.log(`vote ${products[i].votes} + ${votesArrTemp[i]} = ${votesArr[i]}`);
        console.log(`view ${products[i].views} + ${viewsArrTemp[i]} = ${viewsArr[i]}`);

        let liEl = document.createElement('li');
        result.appendChild(liEl);
        liEl.textContent = `${products[i].cProductName} had ${votesArr[i]} votes, and was seen ${viewsArr[i]} times.`;
        
        vResult_Btn.remove();
    }
    saveToLocalStorage();
    chartRender();
    // votesArrTemp = [];
    // viewsArrTemp = [];
}

function chartRender() {
    ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productsNames,
            datasets: [{
                label: '# of Votes',
                data: votesArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: viewsArr,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}