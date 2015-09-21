angular.module('starkAPP')
    .controller('allController', ['$scope', '$rootScope', 'BaseService', '$timeout', '$location',
        function($scope, $rootScope, BaseService, $timeout, $location) {
            var data = [];
            for (name in COURSE_DATA) {
                data.push({
                    name: name,
                    courses: COURSE_DATA[name]
                })
            }
            $scope.data = data;
            var handleCourse;
            $scope.handle = {};
            $scope.showHandle = function() {
                var e = e || window.event;
                handleCourse = this.course;
                
                this.$parent.category.handle = {};
                if (BaseService.courseModel.check(this.course['选课序号'])) {
                    this.$parent.category.handle.text1 = '已选入课表';
                    $scope.update = function() {
                        alert('已经在课表里啦~');
                    }
                }else{
                    this.$parent.category.handle.text1 = '加入课表';
                    $scope.update = function() {
                        BaseService.courseModel.update(handleCourse);
                    }
                }
                var top = e.clientY;
                var left = e.clientX;
                this.$parent.category.handle.name = this.course['课程名称'];
                this.$parent.category.handle.teacher = this.course['教师'];
                this.$parent.category.handle.position = 'left:'+left+'px;top:'+top+'px;';
                this.$parent.category.handleIsShow = true;
            }
            $scope.closeHandle = function(){
                this.category.handleIsShow = false;
            }

        }
    ]);
