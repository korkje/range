/**
 * Range parameters.
 */
export type RangeParams =
    | [end: number]
    | [start: number, end: number]
    | [start: number, end: number, step: number];

/**
 * Iterable representing a range of numbers.
 */
export class Range implements Iterable<number> {
    private start: number;
    private end: number;
    private step: number;
    private name: string;

    constructor(...params: RangeParams) {
        const [start, end] = params.length === 1
        ? [0, params[0]]
        : params;

        const step = params[2] ?? 1;

        if (step === 0) {
            throw new Error("'step' argument must not be zero.");
        }

        this.start = start;
        this.end = end;
        this.step = step;
        this.name = step === 1
            ? `range(${start}, ${end})`
            : `range(${start}, ${end}, ${step})`;

        const asc = start < end;
        if (asc && step < 0 || !asc && step > 0) {
            this.start = this.end = 0;
        }
    }

    [Symbol.iterator](): Iterator<number> {
        const { start, end, step } = this;
        const asc = start < end;
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

    get [Symbol.toStringTag](): string {
        return this.name;
    }
}

/**
 * Creates a new Range instance.
 */
export const range = (...params: RangeParams): Range => new Range(...params);

export default range;
