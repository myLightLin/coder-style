import { describe, expect, it } from 'vitest';

import { buildMatchedReasons, buildSummary } from '@/services/explain';

describe('explain service', () => {
  it('builds three matched reasons', () => {
    const reasons = buildMatchedReasons('interview', 'minimal', 'low');
    expect(reasons).toHaveLength(3);
    expect(reasons[0]).toContain('正式度足够');
    expect(reasons[2]).toContain('基础款');
  });

  it('builds summary with labels', () => {
    expect(buildSummary('commute', 'commuter')).toContain('上班通勤');
    expect(buildSummary('commute', 'commuter')).toContain('通勤稳妥');
  });
});
