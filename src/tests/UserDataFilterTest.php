<?php
require_once(__DIR__.'/../app/lib/autoload.php');

use \PHPUnit\Framework\TestCase;
use App\Account\UserDataFilter;

class UserDataFilterTest extends TestCase
{
    protected $request;
    protected $object;
    protected $testAccounts = [
        ['user' => 'testuser', 'pass' => 'password'],
        ['user' => 'testuser2', 'pass' => 'password2'],
        ['user' => 'testuser3', 'pass' => 'password3'],
    ];

    protected function setUp(): void
    {
        $this->requestMockBuild();
        $this->object = new UserDataFilter($this->request);
    }

    public function requestMockBuild()
    {
        $this->request = $this->createMock('App\Account\AccountHTTPRequest');
        $this->request->expects($this->any())
                ->method('getUsername')
                ->will($this->returnValue('testuser'));
        $this->request->method('getPassword')
                ->will($this->returnValue('password'));
        $this->request->method('getBucket')
                ->will($this->returnValue('bucketname'));
        $this->request->method('getValues')
                ->will($this->returnValue(['testuser', 'password', 'bucketname']));
    }

    public function testLookupAccount()
    {
        $expect = $this->object->lookupAccount($this->testAccounts, false);
        $this->assertTrue($expect);
    }

    public function testCheckRegistedName()
    {
        $this->object->checkRegistedName($this->testAccounts);

        $reflection = new \ReflectionClass($this->object);
        $property = $reflection->getProperty('error');
        $property->setAccessible(true);
        $expect = 'input user name is already in use';
        $this->assertEquals($expect, $property->getValue($this->object));
    }

    public function testIsfillAll()
    {
        $expect = $this->object->isfillAll(['username', 'password', 'bucket']);
        $this->assertTrue($expect);
    }
}
