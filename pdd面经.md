1��fetch��settimeoutʵ������ʱ ����Promise.race(��ʵ��)

2����ֹ��ǩĬ����Ϊ��ԭ��js����ֱ��return false��react����e.preventDefault()��


3��funcA.bind(B).call(C) 
bind��this֮�󲻻��ٱ���
���thisָ��B��������C

4.load��DOMcontentloaded
DOMcontentloaded��DOM�������ִ��
load��DOM���������Դ�������ִ��

5.������
webpack���� postcss-loader + autoprefixer���

6.�̳����ԣ�color��font-size��
��Ԫ�ض���ļ̳������ܻḲ�Ǹ�Ԫ�صļ̳�����
�磺��{color��red 	��important}
       ��{color��black}
����color��black����Ч

7.������ʽ�в������
����ʹ����������������ķ�ʽ���룬��//��
Ҫ��new RegExp() �ķ�ʽ�����������õ�һ���������ַ����������ַ������ӽ��������ӽ�ȥ���ɡ�
�磺
let s='aaa';
let v='a';
console.log(s.match(new RegExp(''+v,'g')));

8.react��ʵ�ֶԻ�����Ƴ��֣���ʧ��������Ⱦ�� 
   ԭ��jsʵ����classlist.add������classlist.remove����������ʽ��display��none��

9.����url����
URLSearchparams API

10.�����������ͺ͸����������͵�����Ϊ:
�ڴ�ķ��䲻ͬ
�����������ʹ洢��ջ�С�

�����������ʹ洢�ڶ��У�ջ�д洢�ı�������ָ����е����õ�ַ��

11.���������Ǻ�������ʱ���ڸ������������Ϻ�������ʱ�����ı�������

12. 10.toString()���
����ᱨ����ΪС�������壬. �ȿ��Խ���Ϊ���ֵ�С���㣬Ҳ���Խ���Ϊ�����ĵ���
�����(10).toString()��10.0.toString()
�ַ������� "abc".toString() ��Ϊ��ʱС����ֻ�ܽ���Ϊ�������á�

13.β�ݹ�(�õݹ鱣�����������ջ)

14.����props��rudexʵ��ͨ�ţ�ref,context��

15.301�����ض���˭�����

16.dpr�ƶ���

17.����������С����12px
.font-6px{
  transform: scale(0.5);
  font-size: 12px;
}


