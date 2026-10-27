// ===== 실행부 =====
async function run() {
  var fam = await setupFonts();
  var page = figma.createPage();
  page.name = '화면 설계서 v0.0.1';
  await figma.setCurrentPageAsync(page);
  page.backgrounds = [solid(C.canvas)];
  var builders = [buildCover, buildCommon, buildS01, buildS02, buildS03, buildS04a, buildS04b, buildS05, buildS06, buildS07, buildS08];
  var colX = [0, 2240], gapY = 200, colY = [0, 0], made = [], errs = [];
  for (var i = 0; i < builders.length; i++) {
    try {
      var node = builders[i]();
      page.appendChild(node);
      var c = i < 2 ? i : (colY[0] <= colY[1] ? 0 : 1);
      node.x = colX[c]; node.y = colY[c];
      colY[c] += node.height + gapY;
      made.push(node);
    } catch (e) {
      errs.push(builders[i].name + ': ' + (e && e.message ? e.message : e));
    }
  }
  if (errs.length) { var et = T('생성 오류:\n' + errs.join('\n'), { s: 40, w: 700, c: '#FF5555' }); page.appendChild(et); et.x = 0; et.y = -400; made.push(et); }
  figma.viewport.scrollAndZoomIntoView(made);
  var msg = '설계서 ' + made.length + '장 생성 · 글꼴 ' + fam + (errs.length ? ' · 오류 ' + errs.length + '건: ' + errs.join(' / ') : '');
  figma.closePlugin(msg);
}
run().catch(function (e) { figma.closePlugin('실패: ' + (e && e.message ? e.message : e)); });
