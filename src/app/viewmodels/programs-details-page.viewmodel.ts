import { IModule } from "../interfaces/module.interface";
import { ApiService } from "../services/api.service";

export class ProgramsDetailsPageViewModel {

  constructor(private _apiService: ApiService) {}

  /**
   * Скачать файл образовательной программы
   * @param {IModule} module Модуль образовательной программы
   */
  public downloadFile(module: IModule) {
    this._apiService.getModuleFile(module.rpm.id)
      .subscribe(rpm => {
        const name = rpm.file.name;
        const content = rpm.file.content;

        const decodedContent = atob(content);

        const arrayBuffer = new ArrayBuffer(decodedContent.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < decodedContent.length; i++) {
          uint8Array[i] = decodedContent.charCodeAt(i);
        }

        const blob = new Blob([uint8Array]);
        const dataUri = URL.createObjectURL(blob);

        const img = new Image();
        img.style.display = 'none';
        img.src = dataUri;
        document.body.appendChild(img);

        const link = document.createElement('a');
        link.href = dataUri;
        link.download = name;
        link.click();
      });
  }
}
