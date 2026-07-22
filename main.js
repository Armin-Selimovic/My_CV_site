import { skills } from './data/skills_data.js';
import { print_jobs } from './init_jobs.js';
import { print_projects } from './init_projects.js';

const email = 'armin.selimovic24@gmail.com';
const phone = '+4367762873247';
const vcard = `BEGIN:VCARD
  VERSION:3.0
  FN:Armin Selimović
  TEL;TYPE=CELL:${phone}
  EMAIL:${email}
  ADR:;;Graz;;;AT
  TITLE:Aspiring Software Engineer
  END:VCARD`;

/* ========================================================================== */
//--vCard answers---
//
['vcard','dockVcard','deskVcard'].forEach( id => {
  const a = document.getElementById(id);

  if(a)
    a.href='data:text/vcard;charset=utf-8,'+ encodeURIComponent(vcard);
});

/* ========================================================================== */
//----Site theme-----
//
function initThemeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');

  if (!btn)
    return;

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const applyTheme = (dark) => {
    root.classList.toggle('dark', dark);
    btn.setAttribute('aria-pressed', String(dark));
  };

  applyTheme(mediaQuery.matches);

  btn.addEventListener('click', () => {
    const currentDark = root.classList.contains('dark');
    applyTheme(!currentDark);
  });

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', (event) => applyTheme(event.matches));
  } else {
    mediaQuery.addListener((event) => applyTheme(event.matches));
  }
}

initThemeToggle();

/* ========================================================================== */
//----Copy email and pop message
//
function popup_Msg(message) {
  document.getElementById('popup').textContent = message;
  document.getElementById('popup').hidden = false;
  setTimeout(()=> popup.hidden = true, 1400);
}

document.getElementById('copyNumber')?.addEventListener('click', async()=>{
  try{
    await navigator.clipboard.writeText(phone);
    popup_Msg('Nummer kopiert');
  } catch {}
});

document.getElementById('copyEmail')?.addEventListener('click', async()=>{
  try{
    await navigator.clipboard.writeText(email);
    popup_Msg('E-Mail kopiert');
  } catch {}
});

/* ========================================================================== */
//----Dock functions----------
//
function showDock(){
  if(window.innerWidth < 900)
    document.querySelector('.dock-mobile').setAttribute('data-visible','true');
}

let dockShown = false;

function checkDock(){
  if(!dockShown && (document.documentElement.scrollTop||document.body.scrollTop) > 100)
    showDock(); dockShown=true;
}

window.addEventListener('scroll', checkDock, { passive:true });

if(window.innerWidth < 900){
  setTimeout(showDock, 700);
}
/* ========================================================================== */
// Details buttons
//
const openAllBtn = document.getElementById('expandAll');
const closeAllBtn = document.getElementById('collapseAll');

//----Expand all details----
//
openAllBtn.addEventListener('click', () => {
  document.querySelectorAll('.details-js').forEach(detail => {
    detail.setAttribute('open', '');
  });
});

//----Collapse all details----
//
closeAllBtn.addEventListener('click', () => {
  document.querySelectorAll('details').forEach(detail => {
    detail.removeAttribute('open');
  });
});

/* ========================================================================== */
//----Generated HTML-----
//
document.querySelector('.projects-grid').innerHTML = print_projects();
document.querySelector('.jobs-js').innerHTML = print_jobs();

function print_skills() {
  let skills_html = '';
  skills.forEach( skill => { skills_html += `<span class="chip-item">${skill}</span>` })
  document.querySelector('.skills-js').innerHTML = skills_html;
}

print_skills()

/* ========================================================================== */
//----Side scroll buttons function-----
//
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".projects-table").forEach(initSlider);
});

function initSlider(table) {
  const grid = table.querySelector(".projects-grid");
  const prev = table.querySelector('.carousel-btn[aria-label="previous"]');
  const next = table.querySelector('.carousel-btn[aria-label="next"]');

  if (!grid || !prev || !next)
    return;

  prev.addEventListener("click", () => scrollByStep(grid, -1));
  next.addEventListener("click", () => scrollByStep(grid,  1));
}

/* ---------- helpers ---------- */

// Scroll by full viewport width
//
function stepPage(grid) {
  return grid.clientWidth;
}

// Scroll by one card
//
function stepOneCard(grid) {
  const card = grid.querySelector(".project-card");
  if (!card) return grid.clientWidth;
  const styles = getComputedStyle(grid);
  const gap = parseFloat(styles.columnGap || styles.gap) || 0;
  return card.offsetWidth + gap;
}

function scrollByStep(grid, dir) {
  const dist = stepOneCard(grid);
  grid.scrollBy({ left: dir * dist, behavior: "smooth" });
}

/* ========================================================================== */
//----Chagne Language-----
//
const languageButton = document.querySelector('.change-language-js');

languageButton.addEventListener('click', () => {
  if(languageButton.innerHTML === '🇩🇪')
    languageButton.innerHTML = '🇬🇧';
  else
    languageButton.innerHTML = '🇩🇪';

  
});