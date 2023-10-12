import { JsonHeaderMiddleware } from './json-header.middleware';

describe('JsonHeaderMiddleware', () => {
  it('should be defined', () => {
    expect(new JsonHeaderMiddleware()).toBeDefined();
  });
});
