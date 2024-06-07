import { assert, assertThrows } from "@std/assert";
import range from "./mod.ts";

Deno.test("reusable", () => {
    const r = range(5);

    assert(r[Symbol.toStringTag] === "range(0, 5)");
    assert([...r].length === 5);
    assert([...r].length === 5);
});

Deno.test("range(_)", async test => {
    await test.step("range(5)", () => {
        const expected = [0, 1, 2, 3, 4];
        const r = range(5);
        const actual = [...r];

        assert(r[Symbol.toStringTag] === "range(0, 5)");
        assert(actual.length === expected.length);

        for (let i = 0; i < actual.length; i++) {
            assert(actual[i] === expected[i]);
        }
    });

    await test.step("range(0)", () => {
        const expected = [];
        const r = range(0);
        const actual = [...r];

        assert(r[Symbol.toStringTag] === "range(0, 0)");
        assert(actual.length === expected.length);
    });

    await test.step("range(-5)", () => {
        const expected = [];
        const r = range(-5);
        const actual = [...r];

        assert(r[Symbol.toStringTag] === "range(0, -5)");
        assert(actual.length === expected.length);
    });
});

Deno.test("range(_, _)", async test => {
    await test.step("range(1, 5)", () => {
        const expected = [1, 2, 3, 4];
        const r = range(1, 5);
        const actual = [...r];

        assert(r[Symbol.toStringTag] === "range(1, 5)");
        assert(actual.length === expected.length);

        for (let i = 0; i < actual.length; i++) {
            assert(actual[i] === expected[i]);
        }
    });

    await test.step("range(5, 1)", () => {
        const expected = [];
        const r = range(5, 1);
        const actual = [...r];

        assert(r[Symbol.toStringTag] === "range(5, 1)");
        assert(actual.length === expected.length);
    });

    await test.step("range(1, 1)", () => {
        const expected = [];
        const r = range(1, 1);
        const actual = [...r];

        assert(r[Symbol.toStringTag] === "range(1, 1)");
        assert(actual.length === expected.length);
    });
});

Deno.test("range(_, _, _)", async test => {
    await test.step("range(1, 5, 2)", () => {
        const expected = [1, 3];
        const r = range(1, 5, 2);
        const actual = [...r];

        assert(r[Symbol.toStringTag] === "range(1, 5, 2)");
        assert(actual.length === expected.length);

        for (let i = 0; i < actual.length; i++) {
            assert(actual[i] === expected[i]);
        }
    });

    await test.step("range(5, 1, 2)", () => {
        const expected = [];
        const r = range(5, 1, 2);
        const actual = [...r];

        assert(r[Symbol.toStringTag] === "range(5, 1, 2)");
        assert(actual.length === expected.length);
    });

    await test.step("range(1, 5, -1)", () => {
        const expected = [];
        const r = range(1, 5, -1);
        const actual = [...r];

        assert(r[Symbol.toStringTag] === "range(1, 5, -1)");
        assert(actual.length === expected.length);
    });

    await test.step("range(5, 1, -1)", () => {
        const expected = [5, 4, 3, 2];
        const r = range(5, 1, -1);
        const actual = [...r];

        assert(r[Symbol.toStringTag] === "range(5, 1, -1)");
        assert(actual.length === expected.length);

        for (let i = 0; i < actual.length; i++) {
            assert(actual[i] === expected[i]);
        }
    });

    await test.step("range(1, 5, 0)", () => {
        assertThrows(() => range(1, 5, 0));
    });

    await test.step("range(5, 1, 0)", () => {
        assertThrows(() => range(5, 1, 0));
    });
});
