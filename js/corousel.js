angular.module('app', ['ui.bootstrap']);
function CarouselDemoCtrl($scope){
  $scope.myInterval = 3000;
  $scope.slides = [
    {
      image: 'https://image.freepik.com/free-vector/person-fighting-virus-illustrated_52683-35833.jpg'
    },
    {
      image: 'https://image.freepik.com/free-vector/prevent-epidemic-rebound-concept-illustration_114360-3008.jpg'
    },
    {
      image: 'https://image.freepik.com/free-psd/house-globe-with-barrier-prevent-coronavirus-covid-19-green-banner_34259-556.jpg'
    },
    {
      image: 'https://image.freepik.com/free-vector/how-dispose-face-mask-properly_23-2148721508.jpg'
    }
  ];
}