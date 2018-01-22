(function (window) {
	var TableInit = function () {
		var oTableInit = new Object();
		oTableInit.table = $('#import_table');
		// 初始化Table
		oTableInit.Init = function () {
			oTableInit.table.bootstrapTable({
				url: 'json/json', // 请求后台的URL（*）
				method: 'get', // 请求方式（*）
				toolbar: '#toolbar', // 工具按钮用哪个容器
				striped: true, // 是否显示行间隔色
				cache: false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
				pagination: true, // 是否显示分页（*）
				sortable: false, // 是否启用排序
				sortOrder: 'asc', // 排序方式
				queryParams: oTableInit.queryParams, // 传递参数（*）
				sidePagination: 'client', // 分页方式：client客户端分页，server服务端分页（*）
				pageNumber: 1, // 初始化加载第一页，默认第一页
				pageSize: 10, // 每页的记录行数（*）
				pageList: [10, 25, 50, 100], // 可供选择的每页的行数（*）
				search: true, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
				strictSearch: true,
				showColumns: true, // 是否显示所有的列
				showRefresh: true, // 是否显示刷新按钮
				minimumCountColumns: 2, // 最少允许的列数
				clickToSelect: true, // 是否启用点击选中行
				height: 500, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
				uniqueId: 'cardid', // 每一行的唯一标识，一般为主键列
				showToggle: true, // 是否显示详细视图和列表视图的切换按钮
				cardView: false, // 是否显示详细视图
				detailView: false, // 是否显示父子表
				showExport: true, // 是否导出
				// //showExport表示是否显示导出的按钮，exportDataType表示导出的模式是当前页、所有数据还是选中数据。
				exportDataType: 'all', // basic', 'all', 'selected'.
				onLoadSuccess: function (data, status) {
					var _self = this;
					_self.data = data;
					// TableExport.init();
				},
				onClickRow: function (row, $element) {
					// alert(row);
					// 一行点击
					curRow = row;
				},
				rowStyle: function (row, index) {
					// 这里有5个取值代表5中颜色['active', 'success', 'info', 'warning',
					// 'danger'];
					var strclass = '';
					if (row.cardid == '445281198908230378') {
						strclass = 'success'; // 还有一个active
					} else if (row.cardid == '372801197703107427') {
						strclass = 'danger';
					} else {
						return {};
					}
					return {
						classes: strclass,
					};
				},
				onEditableSave: function (field, row, oldValue, $el) {
					// 保存编辑
					// $.ajax({
					// type: "post",
					// url: "/Editable/Edit",
					// data: { strJson: JSON.stringify(row) },
					// success: function(data, status) {
					// if(status == "success") {
					// alert("编辑成功");
					// }
					// },
					// error: function() {
					// alert("Error");
					// },
					// complete: function() {
					//
					// }
					//
					// });
				},
				columns: [{
					checkbox: true,
				}, {
					field: 'cardid',
					title: '身份证号',

				}, {
					field: 'studentname',
					title: '学生名称',
					editable: {
						type: 'text',
						title: '学生名称',
						validate: function (v) {
							if (!v)
							{ return '用户名不能为空'; }
						},
					},

				}, {
					field: 'batch',
					title: '批次',
				}, {
					field: 'education',
					title: '专科',

				}, {
					field: 'toolstandard',
					title: '收费标准',
				}, {
					field: 'tuition',
					title: '应交学费',
				}, {
					field: 'channel',
					title: '渠道',
				}, {
					field: 'channeltotle',
					title: '渠道合计',
				}, {
					field: 'returnchannel',
					title: '应返渠道',
				}, {
					field: 'backchannel',
					title: '已返渠道',
				}, {
					field: 'debit',
					title: '渠道扣款',
				}, {
					field: 'favoura',
					title: '直招优惠',
				}, {
					field: 'totelall',
					title: '交款合计',
				}, {
					field: 'channelratio',
					title: '渠道扣款比例',
				}, {
					field: 'arrears',
					title: '欠费',
				}, {
					field: 'remark',
					title: '备注',
				}],
			});
		};

		// 得到查询的参数
		oTableInit.queryParams = function (params) {
			var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				limit: params.limit, // 页面大小
				offset: params.offset, // 页码
				departmentname: $('#txt_search_departmentname').val(),
				statu: $('#txt_search_statu').val(),
				pageNumber: 1,
				pageSize: 10,
			};
			return temp;
		};
		return oTableInit;
	};

	var ButtonInit = function () {
		var oInit = new Object();
		var postdata = {};
		oInit.Init = function () {
			// 初始化页面上面的按钮事件
		};

		return oInit;
	};
	window.onload = function () {
		var X = XLSX;
		var xlf = $('#input-7').change(handleFile);

		function handleFile (e) {
			var files = e.target.files;
			var f = files[0];
			if (!f) {
				console.log('没有可读取的文件或者文件格式出错.');
				return;
			} {
				var reader = new FileReader();
				var name = f.name;
				reader.onload = function (e) {
					if (typeof console !== 'undefined') {
						console.log('onload', new Date());
					}
					var data = e.target.result;
					var wb;
					var arr = fixdata(data);
					wb = X.read(btoa(arr), {
						type: 'base64',
					});
					process_wb(wb);
				};
				reader.readAsArrayBuffer(f);
			}

			// rABS = document.getElementsByName("userabs")[0].checked;
			// use_worker = document.getElementsByName("useworker")[0].checked;
			// var files = e.target.files;
			// var f = files[0];
			// {
			// var reader = new FileReader();
			// //var name = f.name;
			// reader.onload = function(e) {
			// if(typeof console !== 'undefined') console.log("onload", new
			// Date(), rABS, use_worker);
			// var data = e.target.result;
			// if(use_worker) {
			// xw(data, process_wb);
			// } else {
			// var wb;
			// if(rABS) {
			// wb = X.read(data, {type: 'binary'});
			// } else {
			// var arr = fixdata(data);
			// wb = X.read(btoa(arr), {type: 'base64'});
			// }
			// process_wb(wb);
			// }
			// };
			// if(rABS) reader.readAsBinaryString(f);
			// else reader.readAsArrayBuffer(f);
			// }
		}

		function fixdata (data) {
			var o = '',
				l = 0,
				w = 10240;
			for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
			o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
			return o;
		}

		function process_wb (wb) {
			var output = '';
			var jsonobj = to_json(wb);
			output = JSON.stringify(jsonobj, 2, 2);
			alert(output);
			// 读取json数据并赋值给table
			for (i in jsonobj) {
				console.log(jsonobj[i]);
			}
			var list = jsonobj.Sheet1;
			if (list == undefined) {
				console.log('list is null.');
				return;
			}
			var resultlist = [];
			for (index in list) {
				var newobj = {};
				for (obj in list[index]) {
					var obj = obj.trim();
					if (obj == '身份证号') {
						newobj.cardid = list[index][obj];
					}
					if (obj == '学生名称') {
						newobj.studentname = list[index][obj];
					}
					if (obj == '批次') {
						newobj.batch = list[index][obj];
					}
					if (obj == '报考层次') {
						newobj.education = list[index][obj];
					}
					if (obj == '收费标准') {
						newobj.toolstandard = list[index][obj];
					}
					if (obj == '应交学费') {
						newobj.tuition = list[index][obj];
					}
					if (obj == '渠道') {
						newobj.channel = list[index][obj];
					}
					if (obj == '渠道合计') {
						newobj.channeltotle = list[index][obj];
					}
					if (obj == '应返渠道') {
						newobj.returnchannel = list[index][obj];
					}
					if (obj == '已返渠道') {
						newobj.backchannel = list[index][obj];
					}
					if (obj == '渠道扣款') {
						newobj.debit = list[index][obj];
					}
					if (obj == '直招优惠') {
						newobj.favoura = list[index][obj];
					}
					if (obj == '交款合计') {
						newobj.totelall = list[index][obj];
					}
					if (obj == '渠道扣款比例') {
						newobj.channelratio = list[index][obj];
					}
					if (obj == '欠费') {
						newobj.arrears = list[index][obj];
					}
					if (obj == '备注') {
						newobj.remark = list[index][obj];
					}

				}
				resultlist.push(newobj);
			}
			oTable.table.bootstrapTable('load', resultlist);

		}

		function to_json (workbook) {
			var result = {};
			workbook.SheetNames.forEach(function (sheetName) {
				var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				if (roa.length > 0) {
					result[sheetName] = roa;
				}
			});
			return result;
		}

		// if(xlf.addEventListener) xlf.addEventListener('change', handleFile,
		// false);

		// 1.初始化Table
		var oTable = new TableInit();
		oTable.Init();

		// 2.初始化Button的点击事件json
		var oButtonInit = new ButtonInit();
		oButtonInit.Init();

		var insertdata = function () {
			var urlstr = 'jsoncreate';
			var listStudents = oTable.table.bootstrapTable('getSelections');
			$.ajax({
				url: urlstr,
				dataType: 'json',
				type: 'POST',
				data: { listStudents: JSON.stringify(listStudents) },
				success: function (data, state) {
					if (data.result) {
						if (data.result == 'E') {
							alert(data.resultDes);
						} else {
							alert('成功提交');
						}
					}
					oTable.table.bootstrapTable('refresh', { url: 'json/json' });
				},
				error: function (xhr) {
					// 导致出错的原因较多，以后再研究
					alert('error:' + JSON.stringify(xhr));
				},
			}).done(function (data) {
				// 请求成功后要做的工作
				console.log('success');
			}).fail(function () {
				// 请求失败后要做的工作
				console.log('error');
			}).always(function () {
				// 不管成功或失败都要做的工作
				console.log('complete');
			});
		};

		$('#btn_save').click(function () {
			insertdata();
		});
		$('.tooltip-options a').tooltip({ html: true });

	};
})(window);
