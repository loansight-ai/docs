let loaded = new Set(); let count = 0;
function chkPaints(a,n){ (a||[]).forEach(p=>{ if(p.color){ for(const k of ['r','g','b']) if(!(p.color[k]>=0&&p.color[k]<=1)) throw new Error('bad color on '+n);} }); }
class N {
  constructor(type){ this.type=type; this.children=[]; this.parent=null; this.layoutMode='NONE'; this.width=100; this.height=100; this.x=0; this.y=0; this._lp='AUTO'; this.id=String(++count); this.name=type; this.fills=[]; this.strokes=[]; }
  set fills(v){ chkPaints(v,this.name); this._f=v; } get fills(){return this._f;}
  set strokes(v){ chkPaints(v,this.name); this._s=v; } get strokes(){return this._s;}
  appendChild(c){ if(c.parent){ c.parent.children=c.parent.children.filter(x=>x!==c);} c.parent=this; this.children.push(c); }
  resize(w,h){ if(!(w>0&&h>0)) throw new Error('resize invalid '+w+','+h+' on '+this.name); this.width=w; this.height=h; }
  set layoutPositioning(v){ if(v==='ABSOLUTE' && (!this.parent || this.parent.layoutMode==='NONE')) throw new Error('ABSOLUTE needs autolayout parent: '+this.name); this._lp=v; }
  get layoutPositioning(){ return this._lp; }
  set layoutSizingHorizontal(v){ this._chk(v,'H'); this._lsh=v; } get layoutSizingHorizontal(){return this._lsh;}
  set layoutSizingVertical(v){ this._chk(v,'V'); this._lsv=v; } get layoutSizingVertical(){return this._lsv;}
  _chk(v,ax){ const pa=this.parent && this.parent.layoutMode!=='NONE';
    if(v==='FILL' && (!pa || this._lp==='ABSOLUTE')) throw new Error('FILL invalid ('+ax+') on '+this.name+' parent='+(this.parent?this.parent.name:'none'));
    if(v==='HUG' && !(this.layoutMode!=='NONE' || (this.type==='TEXT' && pa))) throw new Error('HUG invalid on '+this.name); }
  set layoutGrow(v){ if(!(this.parent && this.parent.layoutMode!=='NONE')) throw new Error('layoutGrow needs autolayout parent: '+this.name); this._g=v; }
  get layoutGrow(){return this._g;}
  set characters(s){ if(!this.fontName || !loaded.has(this.fontName.family+'|'+this.fontName.style)) throw new Error('font not loaded '+JSON.stringify(this.fontName)); this._c=s; this.width=s.length*(this.fontSize||13)*0.6; this.height=18; }
  get characters(){return this._c;}
  setRangeOpenTypeFeatures(){}
}
global.figma = {
  async listAvailableFontsAsync(){ return ['Regular','Medium','SemiBold','Bold'].map(s=>({fontName:{family:'Noto Sans KR',style:s}})); },
  async loadFontAsync(f){ loaded.add(f.family+'|'+f.style); },
  createFrame(){ return new N('FRAME'); }, createText(){ return new N('TEXT'); }, createRectangle(){ return new N('RECTANGLE'); }, createEllipse(){ return new N('ELLIPSE'); },
  createNodeFromSvg(s){ if(!/^<svg/.test(s)) throw new Error('bad svg'); return new N('FRAME'); },
  createPage(){ const p=new N('PAGE'); return p; }, async setCurrentPageAsync(){}, viewport:{scrollAndZoomIntoView(){}},
  closePlugin(m){ console.log('CLOSE:', m, 'nodes=', count); }
};
require('../code.js');
