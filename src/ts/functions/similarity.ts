function typo(str: string, list: any[], return_str: boolean = false): any {
    let result = 0
    let string: string
    for (let x of list) {
        if (similarity(str, x) > result) {
            result = similarity(str, x)
            string = x
        }
    }

    if (return_str) return string
    else return result
}

function similarity(s1: any, s2: any) {
    function editDistance(s1: string, s2: string) {
        s1 = s1.toLowerCase()
        s2 = s2.toLowerCase()
        
        const costs = new Array()
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i
            for (let j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j
                else {
                    if (j > 0) {
                        let newValue = costs[j - 1]
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                        costs[j]) + 1
                        costs[j - 1] = lastValue
                        lastValue = newValue
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue
        }
        return costs[s2.length]
    }

    let longer = s1
    let shorter = s2
    if (s1.length < s2.length) {
        longer = s2
        shorter = s1
    }

    const longerLength = longer.length
    if (longerLength === 0) return 1

    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
}