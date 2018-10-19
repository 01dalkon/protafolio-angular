import { TestBed } from '@angular/core/testing';

import { InfoPaginaService } from './info-pagina.service';

describe('InfoPaginaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfoPaginaService = TestBed.get(InfoPaginaService);
    expect(service).toBeTruthy();
  });
});
