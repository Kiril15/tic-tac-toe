export function generateWinnerCombinations(size: number, winLength: number = 3): number[][] {
    const combinations: number[][] = [];

    for (let row = 0; row < size; row++) {
        for (let col = 0; col <= size - winLength; col++) {
            const line: number[] = [];
            for (let k = 0; k < winLength; k++) {
                line.push(row * size + col + k);
            }
            combinations.push(line);
        }
    }

    for (let col = 0; col < size; col++) {
        for (let row = 0; row <= size - winLength; row++) {
            const line: number[] = [];
            for (let k = 0; k < winLength; k++) {
                line.push((row + k) * size + col);
            }
            combinations.push(line);
        }
    }

    for (let row = 0; row <= size - winLength; row++) {
        for (let col = 0; col <= size - winLength; col++) {
            const line: number[] = [];
            for (let k = 0; k < winLength; k++) {
                line.push((row + k) * size + (col + k));
            }
            combinations.push(line);
        }
    }

    for (let row = 0; row <= size - winLength; row++) {
        for (let col = winLength - 1; col < size; col++) {
            const line: number[] = [];
            for (let k = 0; k < winLength; k++) {
                line.push((row + k) * size + (col - k));
            }
            combinations.push(line);
        }
    }

    return combinations;
}