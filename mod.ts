type RangeParams =
    [end: number] |
    [start: number, end: number, step?: number];

/**
 * Creates an iterable range of numbers.
 */
export function* range(...params: RangeParams): Iterable<number> {
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
        return;
    }

    for (let i = start; asc ? i < end : i > end; i += step) {
        yield i;
    }
}

export default range;
