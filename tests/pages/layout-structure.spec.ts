import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

function read(relativePath: string) {
  return readFileSync(resolve(__dirname, '..', '..', relativePath), 'utf-8');
}

describe('v2 layout structure', () => {
  it('includes the required tab bar entries in app.json', () => {
    const appConfig = JSON.parse(read('miniprogram/app.json'));
    expect(appConfig.tabBar.list.map((item: { text: string }) => item.text)).toEqual(['首页', '穿搭库', '我的']);
  });

  it('keeps the home page weather summary, cold-start card, and featured preview sections', () => {
    const homeWxml = read('miniprogram/pages/home/index.wxml');
    expect(homeWxml).toContain('summary-card__weather');
    expect(homeWxml).toContain('cold-start');
    expect(homeWxml).toContain('featured-card');
  });

  it('uses a dedicated result hero card and fixed CTA on the results page', () => {
    const resultsWxml = read('miniprogram/pages/results/index.wxml');
    expect(resultsWxml).toContain('result-card');
    expect(resultsWxml).toContain('piece-list');
    expect(resultsWxml).toContain('bottom-cta');
  });

  it('uses gallery, explanation card, and piece grid on the detail page', () => {
    const detailWxml = read('miniprogram/pages/detail/index.wxml');
    expect(detailWxml).toContain('gallery-card');
    expect(detailWxml).toContain('为什么这样搭');
    expect(detailWxml).toContain('piece-grid');
    expect(detailWxml).toContain('保存这套穿搭');
  });
});
