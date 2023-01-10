const parImpar = process.argv[2]
const num = Number(process.argv[3])

function rndNum(min,max) {
    return (
        Math.floor(Math.random()*(max-min + 1))+min
    )
}

const numComp = rndNum(0,1000)
const numTotal = num+numComp
console.log(`NumComp ${numComp}`)
console.log(`NumTotal ${numTotal}`)

if (numTotal%2 == 0) {
    if (parImpar === "par") {
        console.log(`Você escolheu par e o computador ímpar. O resultado foi ${numTotal}. Você ganhou!`)
    } else {
        console.log(`Você escolheu ímpar e o computador par. O resultado foi ${numTotal}. Você perdeu!`)
    }
}else{
    if (parImpar === "par") {
        console.log(`Você escolheu par e o computador ímpar. O resultado foi ${numTotal}. Você perdeu!`)
    } else {
        console.log(`Você escolheu ímpar e o computador par. O resultado foi ${numTotal}. Você ganhou!`) 
    }
}

