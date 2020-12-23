import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs/operators';

type UiTheme = 'dark' | 'light';

interface LayoutState {
  avatarUrl: string;
  name: string;
  tagline: string;
  items: Array<{ label: string; path: string }>;
  social: Array<{ icon: string; url: string }>;
  showMobileMenu: boolean;
  theme: UiTheme;
}

const LS_THEME_KEY = '@@beeman.dev/theme';

const initialState: LayoutState = {
  avatarUrl: 'https://avatars3.githubusercontent.com/u/36491?v=4&s=132',
  name: 'beeman.dev 🐝',
  tagline: 'Author, Developer, Mentor, Teacher',
  items: [
    { label: 'Home', path: '/home' },
    { label: 'Blog', path: '/blog' },
    { label: 'Publications', path: '/publications' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Sponsor', path: '/sponsor' },
  ],
  social: [
    { icon: 'G', url: 'https://github.com/beeman' },
    { icon: 'T', url: 'https://twitter.com/beeman_nl' },
    { icon: 'Y', url: 'https://youtube.com/c/beeeman' },
    { icon: 'D', url: 'https://dev.to/beeeman' },
  ],
  showMobileMenu: false,
  theme: 'dark',
};

@Injectable()
export class LayoutStore extends ComponentStore<LayoutState> {
  private readonly body: HTMLElement;
  constructor(@Inject(DOCUMENT) private document: Document) {
    super(initialState);
    this.body = this.document.body;
    this.initializeThemeEffect();
    this.toggleThemeEffect(this.select((state) => state.theme));
  }

  readonly vm$ = this.select(
    ({ avatarUrl, items, name, showMobileMenu, social, tagline, theme }) => ({
      avatarUrl,
      items,
      name,
      showMobileMenu,
      social,
      tagline,
      theme,
    })
  );

  readonly hideMobileMenu = this.updater((state) => ({
    ...state,
    showMobileMenu: false,
  }));

  readonly toggleMobileMenu = this.updater((state) => ({
    ...state,
    showMobileMenu: !state.showMobileMenu,
  }));

  readonly initializeThemeEffect = this.effect(($) =>
    $.pipe(
      tap(() => {
        const savedTheme = localStorage.getItem(LS_THEME_KEY);
        if (savedTheme) {
          this.setState((state) => ({
            ...state,
            theme: savedTheme as UiTheme,
          }));
        }
      })
    )
  );

  readonly toggleTheme = this.updater((state) => ({
    ...state,
    theme: state.theme === 'dark' ? 'light' : 'dark',
  }));

  private readonly toggleThemeEffect = this.effect<UiTheme>((theme$) =>
    theme$.pipe(
      tap((theme) => {
        localStorage.setItem(LS_THEME_KEY, theme);
        this.body.classList.remove('dark', 'light');
        this.body.classList.add(theme);
      })
    )
  );
}
