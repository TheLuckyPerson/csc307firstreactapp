import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing div whole -- success', () => {
    const expected = 10;
    const got = mut.div(20, 2);
    expect(got).toBe(expected);
});

test('Testing div decimal -- success', () => {
    const expected = .5;
    const got = mut.div(1, 2);
    expect(got).toBe(expected);
});

test('Testing contains num has num -- success', () => {
    const expected = true;
    const got = mut.containsNumbers("j1235trjn235");
    expect(got).toBe(expected);
});

test('Testing contains num no num-- success', () => {
    const expected = false;
    const got = mut.containsNumbers("fsdnfdfhysgdg");
    expect(got).toBe(expected);
});

test('Testing contains num no str -- success', () => {
    const expected = false;
    const got = mut.containsNumbers("");
    expect(got).toBe(expected);
});

test('Testing contains num empty str -- success', () => {
    const expected = false;
    const got = mut.containsNumbers(" ");
    expect(got).toBe(expected);
});