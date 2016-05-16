export function sum(array) {
    return array.reduce(add, 0);
}

function add(a, b) {
    return a + b;
}

export function map( num, min1, max1, min2, max2 ) {
    let num1 = ( num - min1 ) / ( max1 - min1 );
    let num2 = ( num1 * ( max2 - min2 ) ) + min2;

    return num2;
}

export function randomInt(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

export function randomFloat(minValue,maxValue) {
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue));
}
