export default function firstWordToUpperCase(word: string){
    return word.replace(/^./, (str) => str.toUpperCase());
}