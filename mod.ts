type RangeParams =
    [end: number] |
    [start: number, end: number, step?: number];

/**
 * Creates an iterable range of numbers.
 */
export function range(...params: RangeParams): Iterable<number> {
    const [start, end] = params.length === 1
        ? [0, params[0]]
        : params;

    const step = params.length === 3
        ? params[2] ?? 1
        : 1;

    if (step === 0) {
        throw new Error("'step' argument must not be zero.");
    }

    const asc = start < end;

    if (asc && step < 0 || !asc && step > 0) {
        return [];
    }

    return {
        [Symbol.iterator](): Iterator<number> {
            let i = start;

            return {
                next() {
                    if (asc ? i < end : i > end) {
                        const value = i;
                        i += step;

                        return {
                            done: false,
                            value,
                        };
                    }

                    return {
                        done: true,
                        value: undefined,
                    };
                }
            };
        }
    };
}

export default range;
