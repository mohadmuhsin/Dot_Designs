import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from '../emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedDataServiceService } from '../../../services/shared-data-service.service';
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'angular-highcharts';



@Component({
  selector: 'app-designer-home',
  templateUrl: './designer-home.component.html',
  styleUrls: ['./designer-home.component.css'],
})
export class DesignerHomeComponent implements OnInit {
  pieChart: Chart = new Chart({}); 
  DesignsPie: Chart = new Chart({}); 
  Data: string = '';
  authenticated$: any
  authenticate: any
  isSidebarHidden!: Observable<boolean>;
  confirmation: boolean =false
  designerId: any = localStorage.getItem('designerId')
  fee:number = 500
  success:  boolean =false
  paymentHandler: any = null
  booking: any;
  paid!:boolean ;
  chartData: any;
  DesignCount: any;
  designer!: string;
  

  constructor(
    private service: AuthServiceService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private shareData: SharedDataServiceService,
    private route: ActivatedRoute,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.service.designer(this.designerId).subscribe(
      (res: any) => {
        this.designer = res.data.entity_name
        this.shareData.setDesignerName(this.designer);
        
        this.paid = res.data.IsPremium
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        Emitters.authEmitter.emit(false);
      }
    );

    this.service.getCategorywiseQoute(this.designerId).subscribe({
      next: (res: any) => {
        this.chartData = res.map((item: { categoryName: any; count: any; }) => ({
        name: item.categoryName,
        y: item.count,
        color: this.getRandomColor(),
        }));
        
        this.categoryWiseBookingCount();
      }, error: (err: any) => {
        console.log(err);
      }
    })
    
    this.service.getCatogoryWiseDesigns(this.designerId).subscribe({
      next: (res: any) => {
        this.DesignCount = res.map((item: any) => ({
          name: item.categoryName,
          y: item.designCount,
          color:this.getRandomColor()
        }))
        console.log(this.DesignCount,"chaanm");
        this.categoryWiseDesignCount()
      },
      error: (err: any) => {
        console.log(err);
      }
    })
      this.invokeStripe()
  }


  onReject() {
  this.confirmation = false
  location.reload();
  }

  showConfirm() {
    this.confirmation = true
  }

   showPopup() {
  this.success = true;
  }

  closePopup() {
  this.success = false;
  location.reload();
  }

  // payment start
  proceedToPayment(amount: number) {
    const id: any = this.designerId
    
    const paymentHandler = (<any>window).StripeCheckout.configure({
    key:'pk_test_51NUoowSITa8nEg8xS1VwcPLK6TbF2q8Pwqx2CmfprU05wyOsdp97rxjTgnzldI7CVmE2gJJTwrFBrSkkkOpNSDCy000096FGKF',
    locale:'auto',
    token:function(stripeToken:any){
      paymentStripe(stripeToken,amount,id)
      }
    })

      const paymentStripe = (token: any, amount: number, id: any) => {
        this.confirmation = false
        
        this.service.doPayment(token,amount,id).subscribe((res:any)=>{
        this.showPopup()
          const currentRoute = this.route.snapshot.routeConfig?.path;
          this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentRoute]);
          });
        console.log(res);
        this.booking = res.paid

          this.toastr.success("Payment Successfull", "Success", {progressBar: true,});
      },(err)=>{
        const errorMessage = err.error.message 
        this.toastr.error(errorMessage,"Warning!", {progressBar: true,})
      }
      )
    }

    paymentHandler.open({
    name:"Dot Designs",
    description:'Design which you choose',
    amount:amount*100

    })
  }
  // payment end




  // invoke stripe stripe 
  invokeStripe(){  
  if(!window.document.getElementById('stripe-script')){
    const script = window.document.createElement('script')
    script.id = 'stripe-script'
    script.type = 'text/javascript'
    script.src = 'https://checkout.stripe.com/checkout.js'
    script.onload=()=>{
      this.paymentHandler = (<any>window).StripeCheckout.configure({
        key:'pk_test_51NUoowSITa8nEg8xS1VwcPLK6TbF2q8Pwqx2CmfprU05wyOsdp97rxjTgnzldI7CVmE2gJJTwrFBrSkkkOpNSDCy000096FGKF',
        locale:'auto',
        token:function (stripeToken:any){
          console.log(stripeToken,"is this i printed");
        }
      })
    }
    window.document.body.appendChild(script)
  }
}

  
  lineChart = new Chart({
    chart: {
          type: 'line'
        },
    title: {
          text: 'Linechart'
    },
    credits: {
          enabled: false
        },
    series: [
      {
        name: 'Line 1',
        data: [1, 2,22,4,6,1,3]
      } as any
    ]
    }
  )


  categoryWiseBookingCount() { 
    this.pieChart = new Chart({
      chart: {
        type: 'pie',
        plotShadow:true
      },
      title: {
        verticalAlign: 'middle',
        floating:true,
        text: 'Category wise Qoute'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          innerSize: '95%',
          borderWidth: 10,
          borderColor: '',
          dataLabels: {
            connectorWidth:0
          }
        }
      },
      legend: {
        enabled:false
      },
      series: [
          {
            type: 'pie',
            data: this.chartData,
          },
        ],
    })
  }


  categoryWiseDesignCount() { 
    this.DesignsPie = new Chart({
      chart: {
        type: 'pie',
        plotShadow:true
      },
      title: {
        verticalAlign: 'middle',
        floating:true,
        text: 'Category wise Designs',
        style: {
          color: '#ffff'
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          innerSize: '5%',
          borderWidth: 10,
          borderColor: '',
          dataLabels: {
            connectorWidth:0
          }
        }
      },
      legend: {
        enabled:false
      },
      series: [
          {
            type: 'pie',
            data: this.DesignCount,
          },
        ],
    })
  }


  getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

}
  
