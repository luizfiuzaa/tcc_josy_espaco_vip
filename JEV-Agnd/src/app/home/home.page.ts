import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  presentingElement: any = undefined;

  constructor(private actionSheetCtrl: ActionSheetController) {}

  Agendamentos: any[] =[
  {
    status:'Confirmado',
    horarioInicio:'9:00', horarioFim:'10:30',
    cliente:'Laura Peneira',
    servico:'Cabelo, Manicure, Pedicure',
    metodoPagamento:'Pix',
    preco:'150.00',
  },
  {
    status:'Esperando confirmação',
    horarioInicio:'11:00', horarioFim:'12:30',
    cliente:'Josefina Chapéu',
    servico:'Cabelo',
    metodoPagamento:'Dinheiro',
    preco:'50.00',
  },
  {
    status:'Esperando confirmação',
    horarioInicio:'14:20', horarioFim:'15:20',
    cliente:'Claudinha Buxexa',
    servico:'Manicure, Pedicure',
    metodoPagamento:'Débito',
    preco:'100.00',
  },
]

ngOnInit() {
  this.presentingElement = document.querySelector('.ion-page');
}

canDismiss = async () => {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Are you sure?',
    buttons: [
      {
        text: 'Yes',
        role: 'confirm',
      },
      {
        text: 'No',
        role: 'cancel',
      },
    ],
  });

  actionSheet.present();

  const { role } = await actionSheet.onWillDismiss();

  return role === 'confirm';
};

// modalOpenDelete = false;
modalOpenAdd = false;
modalOpenEdit= false;

// setOpenDelete(isOpen: any) {
//   this.modalOpenDelete = isOpen;
// }
setOpenAdd(isOpen: any) {
  this.modalOpenAdd = isOpen;
}
setOpenEdit(isOpen: any) {
  this.modalOpenEdit= isOpen;
}
}
